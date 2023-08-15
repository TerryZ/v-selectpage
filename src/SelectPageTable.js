import { ref, h, defineComponent, mergeProps, nextTick } from 'vue'

import { useDropdown } from './core/render'
import { isMultiple } from './core/helper'

import SelectPageTableCore from './SelectPageTableCore'
import Trigger from './modules/Trigger'
import FormElementSelect from './modules/FormElementSelect'
import FormElementChips from './modules/FormElementChips'

export default defineComponent({
  name: 'SelectPageTable',
  inheritAttrs: false,
  props: {
    disabled: { type: Boolean, default: false }
  },
  emits: ['visible-change'],
  setup (props, { emit, attrs }) {
    const {
      visible,
      adjustDropdown,
      closeDropdown,
      renderDropdown
    } = useDropdown(props)

    const selectedItems = ref([])
    const tableCore = ref(null)

    return () => {
      const elementOption = {
        selected: selectedItems,
        disabled: props.disabled,
        lang: tableCore?.value?.lang,
        renderCell: tableCore?.value?.renderCell,
        onRemove (row) {
          if (isMultiple(attrs)) {
            tableCore.value.removeItem(row)
          } else {
            tableCore.value.removeAll()
          }
        }
      }
      const selectedContents = selectedItems.value.length
        ? () => h(isMultiple(attrs) ? FormElementChips : FormElementSelect, elementOption)
        : undefined

      const triggerOption = {
        dropdownVisible: visible.value,
        disabled: props.disabled,
        placeholder: attrs.placeholder,
        lang: tableCore?.value?.lang
      }
      const dropdownTrigger = h(Trigger, triggerOption, selectedContents)

      const listCoreOption = {
        ref: tableCore,
        onAdjustDropdown: adjustDropdown,
        onCloseDropdown: closeDropdown,
        onSelectionChange (data) {
          selectedItems.value = data
          // close dropdown when item selected in single selection mode
          if (!isMultiple(attrs) && data.length) {
            closeDropdown()
          }
        }
      }

      const dropdownOption = {
        onVisibleChange: val => {
          emit('visible-change', val)
          if (!val) return

          nextTick(() => {
            tableCore.value.setSearchFocus()
          })
        }
      }
      return renderDropdown(
        dropdownOption,
        dropdownTrigger,
        h(SelectPageTableCore, mergeProps(listCoreOption, attrs))
      )
    }
  }
})

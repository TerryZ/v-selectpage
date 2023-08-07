import { ref, h, defineComponent, mergeProps, nextTick } from 'vue'

import { useDropdown } from './core/render'
import { isMultiple } from './core/helper'

import SelectPageListCore from './SelectPageListCore'
import Trigger from './modules/Trigger'
import FormElementSelect from './modules/FormElementSelect'
import FormElementChips from './modules/FormElementChips'

export default defineComponent({
  name: 'SelectPageList',
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
    const listCore = ref(null)

    return () => {
      const elementOption = {
        selected: selectedItems,
        disabled: props.disabled,
        lang: listCore?.value?.lang,
        renderCell: listCore?.value?.renderCell,
        onRemove (row) {
          if (isMultiple(attrs)) {
            listCore.value.removeItem(row)
          } else {
            listCore.value.removeAll()
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
        lang: listCore?.value?.lang
      }
      const dropdownTrigger = h(Trigger, triggerOption, selectedContents)

      const listCoreOption = {
        ref: listCore,
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
            listCore.value.setSearchFocus()
          })
        }
      }
      return renderDropdown(
        dropdownOption,
        dropdownTrigger,
        h(SelectPageListCore, mergeProps(listCoreOption, attrs))
      )
    }
  }
})

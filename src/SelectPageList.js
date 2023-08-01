import { ref, h, defineComponent, mergeProps } from 'vue'

import { useDropdown } from './core/render'
import { isMultiple } from './core/helper'

import SelectPageListCore from './SelectPageListCore'
import Trigger from './components/Trigger'
import FormElementSelect from './components/FormElementSelect'
import FormElementTag from './components/FormElementTag'

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

    // function clear () {
    //   listCore.value && listCore.value.clear()
    //   closeDropdown()
    // }

    const selected = ref([])
    const listCore = ref(null)

    return () => {
      const elementOption = {
        selected,
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
      const selectedContents = selected.value.length
        ? () => h(isMultiple(attrs) ? FormElementTag : FormElementSelect, elementOption)
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
          selected.value = data
        }
      }

      const dropdownOption = {
        onVisibleChange (val) {
          emit('visible-change', val)
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

import { ref, h, defineComponent, mergeProps } from 'vue'

import { useDropdown } from './core/render'

import SelectPageListCore from './SelectPageListCore'
import Trigger from './components/Trigger'

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

    const listCore = ref()

    // function clear () {
    //   listCore.value && listCore.value.clear()
    //   closeDropdown()
    // }

    return () => {
      const triggerOption = {
        dropdownVisible: visible.value,
        selected: listCore?.value?.selected || [],
        disabled: props.disabled,
        placeholder: attrs.placeholder,
        lang: listCore?.value?.lang,
        renderCell: listCore?.value?.renderCell,
        onRemove () {
          closeDropdown()
        }
      }

      const listCoreOption = {
        ref: listCore,
        onAdjustDropdown: adjustDropdown,
        onCloseDropdown: closeDropdown
      }

      const dropdownOption = {
        onVisibleChange (val) {
          emit('visible-change', val)
        }
      }
      return renderDropdown(
        dropdownOption,
        h(Trigger, triggerOption),
        h(SelectPageListCore, mergeProps(listCoreOption, attrs))
      )
    }
  }
})

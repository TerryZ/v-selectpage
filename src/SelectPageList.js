import { ref, h, defineComponent, mergeProps } from 'vue'

import { useDropdown } from './core/selector'

import SelectPageListCore from './SelectPageListCore'

export default defineComponent({
  name: 'SelectPageList',
  inheritAttrs: false,
  props: {
    disabled: { type: Boolean, default: false }
  },
  emits: ['visible-change'],
  setup (props, { emit, attrs }) {
    const {
      adjustDropdown,
      closeDropdown,
      renderDropdown,
      renderDropdownTriggerButton
    } = useDropdown(props)

    const listCore = ref()

    function clear () {
      listCore.value && listCore.value.clear()
      closeDropdown()
    }

    return () => {
      const dropdownTrigger = renderDropdownTriggerButton(
        () => listCore, clear
      )

      const listCoreOption = {
        ref: listCore,
        language: props.language,
        onAdjustDropdown: adjustDropdown,
        onCloseDropdown: closeDropdown
      }
      const contents = h(SelectPageListCore, mergeProps(listCoreOption, attrs))

      const dropdownOption = {
        onVisibleChange (val) {
          emit('visible-change', val)
        }
      }
      return renderDropdown(dropdownOption, dropdownTrigger, contents)
    }
  }
})

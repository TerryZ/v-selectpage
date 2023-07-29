import { ref, h, mergeProps } from 'vue'
import Dropdown from 'v-dropdown'
import IconClose from '../icons/IconClose.vue'

import { useLanguage } from './helper'

export function useDropdown (props) {
  const visible = ref(false)
  const dropdownRef = ref()

  function closeDropdown () {
    dropdownRef.value && dropdownRef.value.close()
  }

  function adjustDropdown () {
    dropdownRef.value && dropdownRef.value.adjust()
  }

  function renderDropdown (customProps, trigger, contents) {
    const dropdownOption = {
      ref: dropdownRef,
      border: true,
      disabled: props.disabled,
      onVisibleChange (val) { visible.value = val }
    }
    return h(Dropdown, mergeProps(dropdownOption, customProps), {
      trigger: () => trigger,
      default: () => contents
    })
  }

  function renderDropdownTriggerButton (useContent, clear) {
    const lang = useLanguage(props.language)
    const content = useContent()
    const elements = []

    const buttonElements = [
      h('span', content?.value?.regionText || lang.placeholder)
    ]

    if (content?.value?.regionText) { // clean icon
      const clearOption = {
        class: 'sp-clear-btn',
        title: lang.clear,
        onClick: e => {
          e.stopPropagation()
          clear && clear()
        }
      }
      buttonElements.push(h('span', clearOption, h(IconClose)))
    } else { // dropdown icon
      buttonElements.push(h('span', { class: 'sp-caret-down' }))
    }

    const btnOption = {
      class: ['sp-default-trigger', { 'sp-opened': visible.value }]
    }
    elements.push(h('div', btnOption, buttonElements))

    return h('div', { class: 'sp-trigger-container' }, elements)
  }

  return {
    visible,
    dropdownRef,
    renderDropdown,
    renderDropdownTriggerButton,
    closeDropdown,
    adjustDropdown
  }
}

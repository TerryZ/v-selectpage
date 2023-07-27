import { ref, h, mergeProps } from 'vue'
import Dropdown from 'v-dropdown'
import IconClose from '../icons/IconClose.vue'

import { useLanguage } from './helper'

export function useDropdown (props) {
  const visible = ref(false)
  const dropdownRef = ref(null)

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

  function renderDropdownTriggerButton (slots, useContent, clear) {
    const lang = useLanguage(props.language)
    const content = useContent()
    const elements = []

    if (slots && 'default' in slots) { // scoped slot
      elements.push(slots.default({ region: content?.value?.region, visible }))
    } else {
      const buttonElements = [
        h('span', content?.value?.regionText || lang.pleaseSelect)
      ]

      if (content?.value?.regionText) { // clean icon
        const clearOption = {
          class: 'rg-clear-btn',
          title: lang.clear,
          onClick: e => {
            e.stopPropagation()
            clear && clear()
          }
        }
        buttonElements.push(h('span', clearOption, h(IconClose)))
      } else { // dropdown icon
        buttonElements.push(h('span', { class: 'rg-caret-down' }))
      }

      const btnOption = {
        class: {
          'rg-default-btn': true,
          'rg-opened': visible.value
        },
        type: 'button'
      }
      elements.push(h('button', btnOption, buttonElements))
    }

    return h('div', { class: 'rg-trigger-container' }, elements)
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

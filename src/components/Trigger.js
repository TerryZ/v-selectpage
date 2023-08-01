import { h } from 'vue'

import '../styles/trigger.sass'

import IconChevronDown from '../icons/IconChevronDown.vue'

export default {
  props: {
    dropdownVisible: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    placeholder: { type: String, default: '' },
    lang: { type: Object, default: undefined }
  },
  setup (props, { slots }) {
    return () => {
      const items = []

      if (Object.hasOwn(slots, 'default')) {
        items.push(slots.default())
      } else {
        // slot default content(placeholder)
        items.push(
          h('div', { class: 'sp-placeholder' }, props.placeholder || props.lang?.placeholder)
        )
      }

      items.push(h(IconChevronDown))

      const btnOption = {
        class: ['sp-trigger-container', { 'sp-opened': props.dropdownVisible }]
      }

      return h('div', btnOption, items)
    }
  }
}

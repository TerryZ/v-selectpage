import { h } from 'vue'

export default {
  name: 'SelectPageCircleButton',
  props: {
    fontSize: { type: String, default: '14px' },
    disabled: { type: Boolean, default: false }
  },
  setup (props, { slots }) {
    return () => {
      const option = {
        class: {
          'sp-circle-icon': true,
          'sp-circle-icon-disabled': props.disabled
        },
        style: {
          'font-size': props.fontSize
        }
      }
      return h('div', option, slots.default && slots.default())
    }
  }
}

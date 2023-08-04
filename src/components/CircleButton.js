import { h } from 'vue'

export default {
  name: 'SelectPageCircleButton',
  props: {
    fontSize: { type: String, default: '14px' }
  },
  setup (props, { slots }) {
    return () => {
      const option = {
        class: 'sp-circle-icon',
        style: {
          'font-size': props.fontSize
        }
      }
      return h('div', option, slots.default && slots.default())
    }
  }
}

import { ref, h } from 'vue'

export default {
  name: 'SelectPageCircleButton',
  props: {
    size: { type: String, default: '' },
    disabled: { type: Boolean, default: false },
    bgColor: { type: String, default: 'transparent' },
    hoverBgColor: { type: String, default: '#f1f1f1' }
  },
  setup (props, { slots }) {
    const backgroundColor = ref('')
    return () => {
      const option = {
        class: {
          'sp-circle-btn': true,
          'sp-circle-btn-disabled': props.disabled,
          'sp-circle-btn--small': props.size === 'small',
          'sp-circle-btn--large': props.size === 'large'
        },
        style: {
          'font-size': props.fontSize,
          'background-color': backgroundColor.value
        },
        onMouseenter () {
          backgroundColor.value = props.hoverBgColor
        },
        onMouseleave () {
          backgroundColor.value = props.bgColor
        }
      }
      return h('div', option, slots.default && slots.default())
    }
  }
}

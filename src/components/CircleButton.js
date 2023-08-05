import { ref, computed, h } from 'vue'

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

    const classes = computed(() => ({
      'sp-circle-btn--disabled': props.disabled,
      'sp-circle-btn--small': props.size === 'small',
      'sp-circle-btn--large': props.size === 'large'
    }))
    const styles = computed(() => ({
      'font-size': props.fontSize,
      'background-color': props.disabled ? 'transparent' : backgroundColor.value
    }))

    return () => {
      const option = {
        class: ['sp-circle-btn', classes.value],
        style: styles.value,
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

import { ref, h } from 'vue'

import '../styles/search.sass'
import { useInject } from '../core/data'

import IconSearch from '../icons/IconSearch.vue'

export default {
  props: {
    modelValue: { type: String, default: '' }
  },
  emits: ['update:modelValue'],
  setup (props, { emit }) {
    const { rtl, debounce } = useInject()

    const timer = ref()

    return () => {
      return h('div', { class: 'sp-search' }, [
        h(IconSearch),
        h('input', {
          type: 'text',
          autocomplete: 'off',
          value: props.modelValue.trim(),
          class: {
            'sp-search-input': true,
            'sp-search-input--rtl': rtl
          },
          // onKeyup: e => this.processKey(e),
          // onKeydown: e => {
          //   e.stopPropagation()
          //   this.processControl(e)
          // },
          onInput: e => {
            clearTimeout(timer.value)
            timer.value = setTimeout(() => {
              emit('update:modelValue', e.target.value.trim())
            }, debounce)
          },
          ref: 'search'
        })
      ])
    }
  }
}

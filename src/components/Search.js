import { ref, h } from 'vue'

import '../styles/search.sass'
import { useInject } from '../core/data'

import IconSearch from '../icons/IconSearch.vue'
import IconTrash from '../icons/IconTrash.vue'

export default {
  props: {
    modelValue: { type: String, default: '' }
  },
  emits: ['update:modelValue'],
  setup (props, { emit }) {
    const { rtl, debounce, haveItemSelected, removeAll } = useInject()

    const timer = ref()
    const inForce = ref(false)

    return () => {
      const items = []

      items.push(
        h('div', { class: 'sp-search-container' }, [
          h(IconSearch, { class: inForce.value ? 'sp-search-in-focus' : '' }),
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
            onFocus: () => { inForce.value = true },
            onBlur: () => { inForce.value = false },
            onInput: e => {
              clearTimeout(timer.value)
              timer.value = setTimeout(() => {
                emit('update:modelValue', e.target.value.trim())
              }, debounce)
            },
            ref: 'search'
          })
        ])
      )

      if (haveItemSelected.value) {
        items.push(
          h(IconTrash, {
            onClick: removeAll
          })
        )
      }

      return h('div', { class: 'sp-search' }, items)
    }
  }
}

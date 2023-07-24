import { ref, h } from 'vue'

import '../styles/search.sass'
import { useInject } from '../core/data'
import { isOperationKey } from '../core/list'

import IconSearch from '../icons/IconSearch.vue'
import IconClose from '../icons/IconClose.vue'

export default {
  props: {
    modelValue: { type: String, default: '' }
  },
  emits: ['update:modelValue', 'keyboard-operation'],
  setup (props, { emit }) {
    const { rtl, debounce } = useInject()

    const timer = ref()
    const inFocus = ref(false)
    const searchRef = ref()

    return () => {
      const searchModules = [
        h(IconSearch, { class: inFocus.value ? 'sp-search-in-focus' : '' }),
        h('input', {
          type: 'text',
          autocomplete: 'off',
          value: props.modelValue.trim(),
          class: {
            'sp-search-input': true,
            'sp-search-input--rtl': rtl
          },
          onKeydown: e => {
            e.stopPropagation()

            if (!isOperationKey(e.keyCode)) return
            emit('keyboard-operation', e.keyCode)
          },
          onFocus: () => { inFocus.value = true },
          onBlur: () => { inFocus.value = false },
          onInput: e => {
            if (isOperationKey(e.keyCode)) return

            clearTimeout(timer.value)
            timer.value = setTimeout(() => {
              emit('update:modelValue', e.target.value.trim())
            }, debounce)
          },
          ref: searchRef
        })
      ]

      if (props.modelValue.trim()) {
        searchModules.push(
          // clean input content
          h(IconClose, {
            onClick () {
              clearTimeout(timer.value)
              emit('update:modelValue', '')
              searchRef.value.focus()
            }
          })
        )
      }

      return h('div', { class: 'sp-search-container' }, searchModules)
    }
  }
}

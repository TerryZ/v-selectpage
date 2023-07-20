import { ref, h } from 'vue'

import '../styles/search.sass'
import { useInject } from '../core/data'

import IconSearch from '../icons/IconSearch.vue'
import IconTrash from '../icons/IconTrash.vue'
import IconClose from '../icons/IconClose.vue'

export default {
  props: {
    modelValue: { type: String, default: '' }
  },
  emits: ['update:modelValue'],
  setup (props, { emit }) {
    const { rtl, debounce, haveItemSelected, removeAll, language } = useInject()

    const timer = ref()
    const inFocus = ref(false)
    const searchRef = ref()

    return () => {
      const items = []

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
          // onKeyup: e => this.processKey(e),
          // onKeydown: e => {
          //   e.stopPropagation()
          //   this.processControl(e)
          // },
          onFocus: () => { inFocus.value = true },
          onBlur: () => { inFocus.value = false },
          onInput: e => {
            clearTimeout(timer.value)
            timer.value = setTimeout(() => {
              emit('update:modelValue', e.target.value.trim())
            }, debounce)
          },
          ref: searchRef
        })
      ]

      // have some search keyword
      if (props.modelValue.trim()) {
        searchModules.push(
          h(IconClose, {
            onClick () {
              clearTimeout(timer.value)
              emit('update:modelValue', '')
              searchRef.value.focus()
            }
          })
        )
      }

      items.push(
        h('div', { class: 'sp-search-container' }, searchModules)
      )

      const icons = []

      if (haveItemSelected.value) {
        icons.push(
          h('div', { title: language.clearAll, onClick: removeAll }, h(IconTrash))
        )
      }

      items.push(h('div', { class: 'sp-search-control' }, icons))

      return h('div', { class: 'sp-search' }, items)
    }
  }
}

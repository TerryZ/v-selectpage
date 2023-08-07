import { ref, computed, h } from 'vue'

import '../styles/search.sass'
import { useInject } from '../core/data'
import { isOperationKey } from '../core/list'
import { useDebounce } from '../core/helper'
import { LANG_SELECTED_COUNT } from '../core/constants'

import CircleButton from '../components/CircleButton'
import IconSearch from '../icons/IconSearch.vue'
import IconClose from '../icons/IconClose.vue'
import IconLoading from '../icons/IconLoading.vue'

export default {
  props: {
    modelValue: { type: String, default: '' }
  },
  emits: ['update:modelValue', 'keyboard-operation'],
  setup (props, { emit, expose }) {
    const { rtl, debounce, loading, language, selectedCount, multiple } = useInject()

    const inFocus = ref(false)
    const searchRef = ref()

    const inputDebounce = useDebounce(debounce)

    const placeholder = computed(() => {
      if (!multiple || !selectedCount.value) {
        return language.search
      }
      return language.selectedCount.replace(LANG_SELECTED_COUNT, selectedCount.value)
    })
    const focus = () => {
      searchRef.value && searchRef.value.focus()
    }

    expose({ focus })

    return () => {
      const icon = computed(() => {
        if (loading.value) {
          return h(IconLoading)
        }
        return h(IconSearch, { class: inFocus.value ? 'sp-search-in-focus' : '' })
      })

      const searchModules = [
        icon.value,
        h('input', {
          type: 'text',
          autocomplete: 'off',
          value: props.modelValue.trim(),
          class: {
            'sp-search-input': true,
            'sp-search-input--rtl': rtl
          },
          placeholder: placeholder.value,
          onKeydown: e => {
            e.stopPropagation()

            if (!isOperationKey(e.keyCode)) return
            emit('keyboard-operation', e.keyCode)
          },
          onFocus: () => { inFocus.value = true },
          onBlur: () => { inFocus.value = false },
          onInput: e => {
            if (isOperationKey(e.keyCode)) return

            inputDebounce(() => {
              emit('update:modelValue', e.target.value.trim())
            })
          },
          ref: searchRef
        })
      ]

      if (props.modelValue.trim()) {
        const clearOption = {
          onClick () {
            emit('update:modelValue', '')
            focus()
          }
        }
        // clean input content
        searchModules.push(
          h(CircleButton, clearOption, () => h(IconClose))
        )
      }

      return h('div', { class: 'sp-search-container' }, searchModules)
    }
  }
}

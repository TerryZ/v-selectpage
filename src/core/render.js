import { ref, h, Transition } from 'vue'

import Pagination from '../components/Pagination'

export function useRender (props, emit) {
  const query = ref('')
  const message = ref('')

  const renderSearch = () => {
    return h('div', { class: 'sp-search' }, [
      h('input', {
        type: 'text',
        autocomplete: 'off',
        value: query.value.trim(),
        class: {
          'sp-search-input': true,
          'sp-search-input--rtl': props.rtl
        },
        onKeyup: e => this.processKey(e),
        onKeydown: e => {
          e.stopPropagation()
          this.processControl(e)
        },
        onInput: e => {
          query.value = e.target.value
        },
        ref: 'search'
      })
    ])
  }
  const renderMessage = () => {
    const child = []
    if (message.value) {
      child.push(
        h('div', { class: 'sp-message' }, [
          h('i', { class: 'sp-iconfont sp-icon-warning' }),
          h('span', { innerHTML: message.value })
        ])
      )
    }

    const option = {
      name: 'sp-message-slide',
      appear: true,
      onEnter: () => this.adjust(),
      onAfterLeave: () => this.adjust()
    }

    return h(Transition, option, () => child)
  }
  const renderPagination = (currentPage, totalRows) => {
    if (!props.pagination) return

    return h(Pagination, {
      totalRows: totalRows.value,
      pageSize: props.pageSize,
      modelValue: currentPage.value,
      'onUpdate:modelValue' (val) {
        currentPage.value = val
      }
    })
  }
  return {
    query,
    message,
    renderSearch,
    renderMessage,
    renderPagination
  }
}

import { h, Transition } from 'vue'

import { useData } from './data'

import List from '../components/List'
import Pagination from '../components/Pagination'

export function useRender (props, emit) {
  const {
    query,
    message,
    currentPage,
    lang,
    haveData,
    selectItem
  } = useData(props)

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
  const renderList = () => {
    if (!haveData()) return renderNoDataMessage()

    return h(List, {
      list: props.data,
      onSelect: row => selectItem(row)
    })
  }
  const renderTable = () => {

  }
  const renderNoDataMessage = () => {
    return h('div', { class: 'sp-result-message' }, lang.not_found)
  }
  const renderPagination = () => {
    if (!props.pagination) return

    return h(Pagination, {
      pageSize: props.pageSize,
      totalRows: props.totalRows,
      modelValue: currentPage.value,
      'onUpdate:modelValue' (val) {
        currentPage.value = val
      }
    })
  }
  return {
    query,
    message,
    currentPage,

    renderSearch,
    renderMessage,
    renderList,
    renderTable,
    renderPagination
  }
}

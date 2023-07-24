import { h, Transition } from 'vue'

import '../styles/common.sass'
import { useData } from './data'
import { useListItemHighlight } from './list'

import Search from '../components/Search'
import Control from '../components/Control'
import List from '../components/List'
import Pagination from '../components/Pagination'

export function useRender (props, emit) {
  const {
    query,
    message,
    currentPage,
    lang,
    isDataEmpty,
    selectItem,
    fetchData
  } = useData(props, emit)
  const {
    highlightIndex,
    keyboardNavigation,
    setItemHighlight
  } = useListItemHighlight(props, emit)

  const renderSearch = () => {
    return h('div', { class: 'sp-search' }, [
      h(Search, {
        modelValue: query.value,
        'onUpdate:modelValue' (val) {
          query.value = val
        },
        onKeyboardOperation: keyCode => {
          keyboardNavigation(keyCode)
        }
      }),
      h(Control)
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
    if (isDataEmpty()) return renderNoDataMessage()

    return h(List, {
      list: props.data,
      highlightIndex: highlightIndex.value,
      onSelect: row => selectItem(row),
      onSetHighlight: index => setItemHighlight(index)
    })
  }
  const renderTable = () => {

  }
  const renderNoDataMessage = () => {
    return h('div', { class: 'sp-result-message' }, lang.notFound)
  }
  const renderPagination = () => {
    if (!props.pagination) return

    return h(Pagination, {
      totalRows: props.totalRows,
      modelValue: currentPage.value,
      'onUpdate:modelValue' (val) {
        currentPage.value = val
        fetchData()
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

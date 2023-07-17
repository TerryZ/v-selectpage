import { h, Transition } from 'vue'

import '../styles/common.sass'
import { useData } from './data'

import Search from '../components/Search'
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
  } = useData(props, emit)

  const renderSearch = () => {
    return h(Search, {
      modelValue: query.value,
      'onUpdate:modelValue' (val) {
        query.value = val
      }
    })
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
    return h('div', { class: 'sp-result-message' }, lang.notFound)
  }
  const renderPagination = () => {
    if (!props.pagination) return

    return h(Pagination, {
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

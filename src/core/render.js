import { h, Transition } from 'vue'

import '../styles/common.sass'
import { useData } from './data'
import { useListItemHighlight } from './list'
import { usePagination } from './pagination'
import { isHighlightOperation, isPagingOperation, isSelectOperation } from './helper'

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
    setItemHighlight,
    highlightNavigation
  } = useListItemHighlight(props, emit)
  const {
    paginationInfo,
    isFirstPage,
    isLastPage,
    switchPage,
    pagingNavigation
  } = usePagination(props, currentPage, lang)

  let keyboardTimer

  const renderSearch = () => {
    return h('div', { class: 'sp-search' }, [
      h(Search, {
        modelValue: query.value,
        'onUpdate:modelValue' (val) {
          query.value = val
        },
        onKeyboardOperation: keyCode => {
          // press UP or DOWN key to change highlight row
          if (isHighlightOperation(keyCode)) return highlightNavigation(keyCode)
          // press LEFT or RIGHT key to change current page
          if (isPagingOperation(keyCode)) {
            pagingNavigation(keyCode)

            clearTimeout(keyboardTimer)
            keyboardTimer = setTimeout(fetchData, props.debounce)

            return
          }
          // press ENTER key to selected the highlight row
          if (isSelectOperation(keyCode)) return selectItem(props.data[highlightIndex.value])
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
    if (isDataEmpty()) return renderNoDataMessage()
  }
  const renderNoDataMessage = () => {
    return h('div', { class: 'sp-result-message' }, lang.notFound)
  }
  const renderPagination = () => {
    if (!props.pagination) return

    return h(Pagination, {
      pageInfo: paginationInfo.value,
      isFirstPage: isFirstPage.value,
      isLastPage: isLastPage.value,
      onPageChange (action) {
        switchPage(action)
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

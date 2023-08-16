import { h, Transition, ref, mergeProps } from 'vue'

import '../styles/common.sass'
import { useData } from './data'
import { useListItemHighlight } from './list'
import { usePagination } from './pagination'
import {
  isHighlightOperation,
  isPagingOperation,
  isSelectOperation,
  isEscapeOperation,
  useDebounce
} from './helper'
import { parseWidth } from '../core/utilities'

import Dropdown from 'v-dropdown'
import Search from '../modules/Search'
import Control from '../modules/Control'
import List from '../modules/List'
import Table from '../modules/Table'
import Pagination from '../modules/Pagination'

import IconMessage from '../icons/IconMessage.vue'

export function useRender (props, emit) {
  const {
    lang,
    selected,
    query,
    message,
    currentPage,
    list,
    isDataEmpty,
    selectItem,
    fetchData,
    renderCell,
    removeAll,
    removeItem
  } = useData(props, emit)
  const {
    highlightIndex,
    setItemHighlight,
    highlightNavigation,
    isSomeRowHighlight
  } = useListItemHighlight(props, emit, list)
  const {
    paginationInfo,
    isFirstPage,
    isLastPage,
    switchPage,
    pagingNavigation
  } = usePagination(props, currentPage, lang)

  const keyboardDebounce = useDebounce(props.debounce)

  const search = ref()

  const setSearchFocus = () => {
    search.value && search.value.focus()
  }

  const renderSearch = () => {
    return h('div', { class: 'sp-search' }, [
      h(Search, {
        ref: search,
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
            keyboardDebounce(fetchData)
            return
          }
          // press ENTER key to selected the highlight row
          if (isSelectOperation(keyCode)) {
            if (!isSomeRowHighlight()) return
            return selectItem(list.value[highlightIndex.value])
          }
          // press ESCAPE key to close dropdown
          if (isEscapeOperation(keyCode)) {
            emit('close-dropdown')
          }
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
          h(IconMessage),
          h('div', { class: 'sp-message-body', innerHTML: message.value })
        ])
      )
    }

    const option = {
      name: 'sp-message-slide',
      appear: true,
      onEnter: () => emit('adjust-dropdown'),
      onAfterLeave: () => emit('adjust-dropdown')
    }

    return h(Transition, option, () => child)
  }
  const renderList = () => {
    if (isDataEmpty()) return renderNoDataMessage()

    return h(List, {
      list: list.value,
      highlightIndex: highlightIndex.value,
      onSelect: row => selectItem(row),
      onSetHighlight: index => setItemHighlight(index)
    })
  }
  const renderTable = () => {
    if (isDataEmpty()) return renderNoDataMessage()

    return h(Table, {
      list: list.value,
      columns: props.columns,
      highlightIndex: highlightIndex.value,
      onSelect: row => selectItem(row),
      onSetHighlight: index => setItemHighlight(index)
    })
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
  const renderContainer = children => {
    const option = {
      class: 'sp-container'
    }

    if (props.width) {
      option.style = {
        width: parseWidth(props.width)
      }
    }
    return h('div', option, children)
  }

  return {
    selected,
    query,
    message,
    currentPage,
    lang,

    renderCell,
    removeAll,
    removeItem,
    setSearchFocus,

    renderSearch,
    renderMessage,
    renderList,
    renderTable,
    renderPagination,
    renderContainer
  }
}

export function useDropdown (props) {
  const visible = ref(false)
  const dropdownRef = ref()

  function closeDropdown () {
    dropdownRef.value && dropdownRef.value.close()
  }

  // adjust dropdown position
  function adjustDropdown () {
    dropdownRef.value && dropdownRef.value.adjust()
  }

  function renderDropdown (customProps, trigger, contents) {
    const dropdownOption = {
      ref: dropdownRef,
      border: false,
      fullWidth: true,
      disabled: props.disabled,
      onVisibleChange (val) { visible.value = val }
    }
    return h(Dropdown, mergeProps(dropdownOption, customProps), {
      trigger: () => trigger,
      default: () => contents
    })
  }

  return {
    visible,
    dropdownRef,
    renderDropdown,
    closeDropdown,
    adjustDropdown
  }
}

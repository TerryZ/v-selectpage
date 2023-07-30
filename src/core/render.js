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

import Dropdown from 'v-dropdown'
import Search from '../components/Search'
import Control from '../components/Control'
import List from '../components/List'
import Pagination from '../components/Pagination'
import IconMessage from '../icons/IconMessage.vue'
import IconChevronDown from '../icons/IconChevronDown.vue'

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
    highlightNavigation,
    isSomeRowHighlight
  } = useListItemHighlight(props, emit)
  const {
    paginationInfo,
    isFirstPage,
    isLastPage,
    switchPage,
    pagingNavigation
  } = usePagination(props, currentPage, lang)

  const keyboardDebounce = useDebounce(props.debounce)

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
            keyboardDebounce(fetchData)
            return
          }
          // press ENTER key to selected the highlight row
          if (isSelectOperation(keyCode)) {
            if (!isSomeRowHighlight()) return
            return selectItem(props.data[highlightIndex.value])
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
    lang,

    renderSearch,
    renderMessage,
    renderList,
    renderTable,
    renderPagination
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
      border: true,
      disabled: props.disabled,
      onVisibleChange (val) { visible.value = val }
    }
    return h(Dropdown, mergeProps(dropdownOption, customProps), {
      trigger: () => trigger,
      default: () => contents
    })
  }

  function renderDropdownTrigger (getContent) {
    const contentRef = getContent()

    const items = [
      'asdf'
    ]

    items.push(h(IconChevronDown))

    const btnOption = {
      class: ['sp-trigger-container', { 'sp-opened': visible.value }]
    }

    return h('div', btnOption, items)
  }

  return {
    visible,
    dropdownRef,
    renderDropdown,
    renderDropdownTrigger,
    closeDropdown,
    adjustDropdown
  }
}

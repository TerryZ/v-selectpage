import { computed } from 'vue'

import {
  FIRST_PAGE,
  ACTION_FIRST, ACTION_PREVIOUS, ACTION_NEXT, ACTION_LAST,
  LANG_PAGE_NUMBER, LANG_PAGE_COUNT, LANG_ROW_COUNT
} from './constants'

export function usePagination (props, currentPage, lang) {
  const totalPage = computed(() => Math.ceil(props.totalRows / props.pageSize))
  const isFirstPage = computed(() => currentPage.value === FIRST_PAGE)
  const isLastPage = computed(() => currentPage.value === totalPage.value)
  const paginationInfo = computed(() => lang.pageInfo
    .replace(LANG_PAGE_NUMBER, currentPage.value)
    .replace(LANG_PAGE_COUNT, totalPage.value)
    .replace(LANG_ROW_COUNT, props.totalRows)
  )

  const getPageNumber = function (action) {
    switch (action) {
      case ACTION_FIRST: return FIRST_PAGE
      case ACTION_PREVIOUS: return currentPage.value - 1
      case ACTION_NEXT: return currentPage.value + 1
      case ACTION_LAST: return totalPage.value
      default: return undefined
    }
  }
  const switchPage = function (action) {
    const pageNumber = getPageNumber(action)

    if (typeof pageNumber === 'undefined') return
    if (pageNumber === currentPage.value) return

    currentPage.value = pageNumber
  }

  return {
    paginationInfo,
    isFirstPage,
    isLastPage,
    switchPage
  }
}

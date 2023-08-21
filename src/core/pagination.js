import { computed } from 'vue'

import {
  FIRST_PAGE,
  ACTION_FIRST, ACTION_PREVIOUS, ACTION_NEXT, ACTION_LAST,
  LANG_PAGE_NUMBER, LANG_PAGE_COUNT, LANG_ROW_COUNT,
  LEFT, RIGHT
} from './constants'

export function usePagination (props, currentPage, totalRows, lang) {
  const totalPage = computed(() => Math.ceil(totalRows.value / props.pageSize))
  const isFirstPage = computed(() => currentPage.value === FIRST_PAGE)
  const isLastPage = computed(() => currentPage.value === totalPage.value)
  const paginationInfo = computed(() => lang.pageInfo
    .replace(LANG_PAGE_NUMBER, currentPage.value)
    .replace(LANG_PAGE_COUNT, totalPage.value)
    .replace(LANG_ROW_COUNT, totalRows.value)
  )

  const getNewPageNumber = function (action) {
    switch (action) {
      case ACTION_FIRST: return FIRST_PAGE
      case ACTION_PREVIOUS: return currentPage.value - 1
      case ACTION_NEXT: return currentPage.value + 1
      case ACTION_LAST: return totalPage.value
    }
  }
  const switchPage = function (action) {
    let pageNumber = getNewPageNumber(action)

    if (typeof pageNumber === 'undefined') return
    if (pageNumber < FIRST_PAGE) pageNumber = FIRST_PAGE
    if (pageNumber > totalPage.value) pageNumber = totalPage.value
    if (pageNumber === currentPage.value) return

    currentPage.value = pageNumber
  }

  const pagingNavigation = keyCode => {
    if (keyCode === LEFT) return switchPage(ACTION_PREVIOUS)
    if (keyCode === RIGHT) return switchPage(ACTION_NEXT)
  }

  return {
    paginationInfo,
    isFirstPage,
    isLastPage,
    switchPage,
    pagingNavigation
  }
}

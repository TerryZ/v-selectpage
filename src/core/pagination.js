import { ref, computed } from 'vue'

import {
  FIRST_PAGE,
  ACTION_FIRST, ACTION_PREVIOUS, ACTION_NEXT, ACTION_LAST,
  LANG_PAGE_NUMBER, LANG_PAGE_COUNT, LANG_ROW_COUNT
} from './constants'
import { useInject } from '../core/data'

export function usePagination (props, emit) {
  const { language } = useInject()

  const lastNumber = ref(-1)

  const totalPage = computed(() => Math.ceil(props.totalRows / props.pageSize))
  const pageInfo = computed(() => language.pageInfo
    .replace(LANG_PAGE_NUMBER, props.modelValue)
    .replace(LANG_PAGE_COUNT, totalPage.value)
    .replace(LANG_ROW_COUNT, props.totalRows)
  )
  const isFirstPage = computed(() => props.modelValue === FIRST_PAGE)
  const isLastPage = computed(() => props.modelValue === totalPage.value)

  const getPageNumber = function (action) {
    switch (action) {
      case ACTION_FIRST: return FIRST_PAGE
      case ACTION_PREVIOUS: return props.modelValue > FIRST_PAGE
        ? props.modelValue - 1
        : FIRST_PAGE
      case ACTION_NEXT: return props.modelValue < totalPage.value
        ? props.modelValue + 1
        : totalPage.value
      case ACTION_LAST: return totalPage.value
    }
  }
  const switchPage = function (action) {
    const pageNumber = getPageNumber(action)
    if (pageNumber === lastNumber.value) {
      return
    }
    if (pageNumber) {
      emit('update:modelValue', pageNumber)
    }
    lastNumber.value = pageNumber
  }

  return {
    totalPage,
    pageInfo,
    isFirstPage,
    isLastPage,
    getPageNumber,
    switchPage
  }
}

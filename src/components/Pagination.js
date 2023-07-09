import { ref, computed, h } from 'vue'

import {
  FIRST_PAGE, DEFAULT_PAGE_SIZE,
  ACTION_FIRST, ACTION_PREVIOUS, ACTION_NEXT, ACTION_LAST,
  LANG_PAGE_NUMBER, LANG_PAGE_COUNT, LANG_ROW_COUNT
} from '../core/constants'
import { useLanguage } from '../core/helper'
import { useInject } from '../core/list'

export default {
  name: 'SelectPagePagination',
  props: {
    modelValue: { type: Number, default: FIRST_PAGE },
    pageSize: { type: Number, default: DEFAULT_PAGE_SIZE },
    totalRow: { type: Number, default: 0 }
  },
  emits: ['update:modelValue'],
  setup (props, { emit }) {
    const { language } = useInject()

    const lastNumber = ref(-1)

    const lang = useLanguage(language)

    const totalPage = computed(() => Math.ceil(props.totalRow / props.pageSize))
    const pageInfo = computed(() => lang.pageInfo
      .replace(LANG_PAGE_NUMBER, props.modelValue)
      .replace(LANG_PAGE_COUNT, totalPage.value)
      .replace(LANG_ROW_COUNT, props.totalRow)
    )
    const isFirstPage = computed(() => props.modelValue === FIRST_PAGE)
    const isLastPage = computed(() => props.modelValue === totalPage.value)

    const getPageNumber = function (action) {
      switch (action) {
        case ACTION_FIRST: return FIRST_PAGE
        case ACTION_PREVIOUS:
          return props.modelValue > FIRST_PAGE
            ? props.modelValue - 1
            : FIRST_PAGE
        case ACTION_NEXT:
          return props.modelValue < totalPage.value
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

    return () => {
      const list = []
      const genItem = (classes, title, action) => {
        const linkOption = {
          href: 'javascript:void(0)',
          onClick: () => switchPage(action)
        }
        return h('li', { class: classes, title }, [
          h('a', linkOption, h('i', { class: `sp-iconfont sp-icon-${action}` }))
        ])
      }
      list.push(
        genItem({ 'sp-disabled': isFirstPage.value }, lang.first, ACTION_FIRST)
      )
      list.push(
        genItem({ 'sp-disabled': isFirstPage.value }, lang.prev, ACTION_PREVIOUS)
      )
      list.push(
        genItem({ 'sp-disabled': isLastPage.value, 'sp-right': true }, lang.last, ACTION_LAST)
      )
      list.push(
        genItem({ 'sp-disabled': isLastPage.value, 'sp-right': true }, lang.next, ACTION_NEXT)
      )

      return h('div', { class: 'sp-pagination' }, [
        h('div', { class: 'sp-page-info' }, pageInfo.value),
        h('ul', list)
      ])
    }
  }
}

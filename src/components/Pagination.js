import { ref, computed, h } from 'vue'

import '../styles/pagination.sass'

import {
  FIRST_PAGE,
  ACTION_FIRST, ACTION_PREVIOUS, ACTION_NEXT, ACTION_LAST,
  LANG_PAGE_NUMBER, LANG_PAGE_COUNT, LANG_ROW_COUNT
} from '../core/constants'
import { useLanguage } from '../core/helper'
import { useInject } from '../core/data'

import IconFirst from '../icons/IconFirst.vue'
import IconPrevious from '../icons/IconPrevious.vue'
import IconNext from '../icons/IconNext.vue'
import IconLast from '../icons/IconLast.vue'

export default {
  name: 'SelectPagePagination',
  props: {
    modelValue: { type: Number, default: FIRST_PAGE },
    totalRows: { type: Number, default: 0 }
  },
  emits: ['update:modelValue'],
  setup (props, { emit }) {
    const { language, pageSize } = useInject()

    const lastNumber = ref(-1)

    const lang = useLanguage(language)

    const totalPage = computed(() => Math.ceil(props.totalRows / pageSize))
    const pageInfo = computed(() => lang.pageInfo
      .replace(LANG_PAGE_NUMBER, props.modelValue)
      .replace(LANG_PAGE_COUNT, totalPage.value)
      .replace(LANG_ROW_COUNT, props.totalRows)
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
      const genItem = (classes, title, action, icon) => {
        const linkOption = {
          href: 'javascript:void(0)',
          onClick: () => switchPage(action)
        }
        const btnClass = {
          ...classes,
          'sp-page-button': true
        }
        return h('div', { class: btnClass, title }, [
          h('a', linkOption, h(icon))
        ])
      }
      list.push(
        genItem(
          { 'sp-disabled': isFirstPage.value },
          lang.first,
          ACTION_FIRST,
          IconFirst
        )
      )
      list.push(
        genItem(
          { 'sp-disabled': isFirstPage.value },
          lang.prev,
          ACTION_PREVIOUS,
          IconPrevious
        )
      )
      list.push(
        genItem(
          { 'sp-disabled': isLastPage.value },
          lang.next,
          ACTION_NEXT,
          IconNext
        )
      )
      list.push(
        genItem(
          { 'sp-disabled': isLastPage.value },
          lang.last,
          ACTION_LAST,
          IconLast
        )
      )

      return h('div', { class: 'sp-pagination' }, [
        h('div', { class: 'sp-page-info' }, pageInfo.value),
        h('div', { class: 'sp-page-control' }, list)
      ])
    }
  }
}

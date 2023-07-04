import { ref, computed, inject, h } from 'vue'

import { FIRST_PAGE } from '../core/constants'
import { useLanguage } from '../core/helper'

export default {
  name: 'SelectPagePagination',
  props: {
    modelValue: { type: Number, default: FIRST_PAGE },
    pageSize: Number,
    totalRow: Number
  },
  emits: ['update:modelValue'],
  setup (props, { emit }) {
    const lastNumber = ref(-1)

    const language = inject('language')
    const lang = useLanguage(language)

    const totalPage = computed(() => Math.ceil(props.totalRow / props.pageSize))
    const pageInfo = computed(() =>
      lang.pageInfo
        .replace('page_num', props.modelValue)
        .replace('page_count', totalPage.value)
        .replace('row_count', props.totalRow)
    )

    const getPageNumber = function (action) {
      switch (action) {
        case 'first': return FIRST_PAGE
        case 'previous': return props.modelValue > FIRST_PAGE ? props.modelValue - 1 : FIRST_PAGE
        case 'next': return props.modelValue < totalPage.value ? props.modelValue + 1 : totalPage.value
        case 'last': return totalPage.value
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
        return h('li', {
          class: classes,
          title
        }, [
          h('a', {
            href: 'javascript:void(0)',
            onClick: () => switchPage(action)
          }, [h('i', { class: `sp-iconfont sp-icon-${action}` })])
        ])
      }
      list.push(genItem({ 'sp-disabled': props.modelValue === FIRST_PAGE }, lang.first, 'first'))
      list.push(genItem({ 'sp-disabled': props.modelValue === FIRST_PAGE }, lang.prev, 'previous'))
      list.push(genItem({ 'sp-disabled': props.modelValue === totalPage.value, 'sp-right': true }, lang.last, 'last'))
      list.push(genItem({ 'sp-disabled': props.modelValue === totalPage.value, 'sp-right': true }, lang.next, 'next'))

      return h('div', { class: 'sp-pagination' }, [
        h('div', { class: 'sp-page-info' }, pageInfo.value),
        h('ul', list)
      ])
    }
  }
}

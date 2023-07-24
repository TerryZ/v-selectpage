import { ref, computed, h } from 'vue'

import '../styles/pagination.sass'

import {
  FIRST_PAGE,
  ACTION_FIRST, ACTION_PREVIOUS, ACTION_NEXT, ACTION_LAST,
  LANG_PAGE_NUMBER, LANG_PAGE_COUNT, LANG_ROW_COUNT
} from '../core/constants'
import { useInject } from '../core/data'

import IconFirst from '../icons/IconFirst.vue'
import IconPrevious from '../icons/IconPrevious.vue'
import IconNext from '../icons/IconNext.vue'
import IconLast from '../icons/IconLast.vue'

export default {
  name: 'SelectPagePagination',
  props: {
    modelValue: { type: Number, default: FIRST_PAGE },
    totalRows: { type: Number, default: 0 },
    isFirstPage: { type: Boolean, default: true },
    isLastPage: { type: Boolean, default: false }
  },
  emits: ['update:modelValue'],
  setup (props, { emit }) {
    const { language } = useInject()
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
          { 'sp-disabled': props.isFirstPage },
          language.first,
          ACTION_FIRST,
          IconFirst
        )
      )
      list.push(
        genItem(
          { 'sp-disabled': props.isFirstPage },
          language.prev,
          ACTION_PREVIOUS,
          IconPrevious
        )
      )
      list.push(
        genItem(
          { 'sp-disabled': props.isLastPage },
          language.next,
          ACTION_NEXT,
          IconNext
        )
      )
      list.push(
        genItem(
          { 'sp-disabled': props.isLastPage },
          language.last,
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

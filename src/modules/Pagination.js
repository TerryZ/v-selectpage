import { h } from 'vue'

import '../styles/pagination.sass'

import {
  ACTION_FIRST, ACTION_PREVIOUS, ACTION_NEXT, ACTION_LAST
} from '../core/constants'
import { useInject } from '../core/data'

import IconFirst from '../icons/IconFirst.vue'
import IconPrevious from '../icons/IconPrevious.vue'
import IconNext from '../icons/IconNext.vue'
import IconLast from '../icons/IconLast.vue'

export default {
  name: 'SelectPagePagination',
  props: {
    pageInfo: { type: String, default: '' },
    isFirstPage: { type: Boolean, default: true },
    isLastPage: { type: Boolean, default: false }
  },
  emits: ['page-change'],
  setup (props, { emit }) {
    const { language } = useInject()

    return () => {
      const buttons = [
        { action: ACTION_FIRST, title: language.first, disabled: props.isFirstPage, icon: IconFirst },
        { action: ACTION_PREVIOUS, title: language.prev, disabled: props.isFirstPage, icon: IconPrevious },
        { action: ACTION_NEXT, title: language.next, disabled: props.isLastPage, icon: IconNext },
        { action: ACTION_LAST, title: language.last, disabled: props.isLastPage, icon: IconLast }
      ]

      const items = buttons.map(btn => {
        const linkOption = {
          href: 'javascript:void(0)',
          onClick: () => emit('page-change', btn.action)
        }
        const classes = [{ 'sp-page-disabled': btn.disabled }, 'sp-page-button']
        return h('div', { class: classes, title: btn.title }, [
          h('a', linkOption, h(btn.icon))
        ])
      })

      return h('div', { class: 'sp-pagination' }, [
        h('div', { class: 'sp-page-info' }, props.pageInfo),
        h('div', { class: 'sp-page-control' }, items)
      ])
    }
  }
}

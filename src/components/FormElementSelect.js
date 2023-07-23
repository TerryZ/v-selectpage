import { h } from 'vue'

import { useLanguage } from '../core/helper'
import { useInject } from '../core/list'

export default {
  name: 'SelectPageSelect',
  props: {
    picked: { type: Array, default: undefined },
    disabled: { type: Boolean, default: false },
    placeholder: { type: String, default: '' }
  },
  emits: ['remove'],
  setup (props, { emit }) {
    const { language, renderCell } = useInject()
    const lang = useLanguage(language)

    const remove = () => emit('remove')

    return () => {
      const children = [
        h('div', { class: 'sp-base sp-input' }, props.picked?.length
          ? h('span', { innerHTML: renderCell(props.picked[0]) })
          : h('span', { class: 'sp-placeholder' }, props.placeholder)
        )
      ]
      // clear button
      if (props.picked?.length && !props.disabled) {
        const option = {
          class: 'sp-clear',
          title: lang.clear,
          onClick: e => {
            e.stopPropagation()
            remove()
          }
        }
        children.push(
          h('div', option, h('i', { class: 'sp-iconfont sp-icon-close' }))
        )
      }
      return h('div', children)
    }
  }
}

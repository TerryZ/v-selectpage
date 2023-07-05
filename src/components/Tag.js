import { h } from 'vue'

import { useInject } from '../core/list'

export default {
  name: 'SelectPageTag',
  props: {
    picked: { type: Array, default: undefined },
    disabled: { type: Boolean, default: false },
    placeholder: { type: String, default: '' }
  },
  emits: ['remove'],
  setup (props, { emit }) {
    const { renderCell } = useInject()

    const remove = index => emit('remove', index)

    return () => {
      const tags = []
      if (props.picked?.length) {
        props.picked.forEach((val, index) => {
          const tag = [h('span', { innerHTML: renderCell(val) })]
          // close button in the tag
          if (!props.disabled) {
            tag.push(
              h('span', {
                onClick: e => {
                  e.stopPropagation()
                  remove(index)
                }
              }, h('i', { class: 'sp-iconfont sp-icon-close' }))
            )
          }
          tags.push(h('span', { class: 'sp-selected-tag', key: index }, tag))
        })
      } else {
        // display placeholder message when there are no tags
        tags.push(h('span', { class: 'sp-placeholder' }, props.placeholder))
      }
      return h('div', { class: 'sp-base sp-inputs' }, tags)
    }
  }
}

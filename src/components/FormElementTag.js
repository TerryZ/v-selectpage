import { h, toRef } from 'vue'

import IconClose from '../icons/IconClose.vue'

export default {
  name: 'SelectPageTag',
  props: {
    selected: { type: Object, default: undefined },
    disabled: { type: Boolean, default: false },
    renderCell: { type: Function, default: undefined }
  },
  emits: ['remove'],
  setup (props, { emit }) {
    const selected = toRef(props, 'selected')

    return () => {
      const tags = selected.value.map((item, index) => {
        const tag = [h('div', { innerHTML: props.renderCell(item) })]
        // close icon for tag
        if (!props.disabled) {
          tag.push(
            h('div', {
              class: 'sp-tag-remove',
              onClick: e => {
                e.stopPropagation()
                emit('remove', item)
              }
            }, h(IconClose))
          )
        }
        return h('div', { class: 'sp-tag', key: index }, tag)
      })
      return h('div', { class: 'sp-trigger sp-tags' }, tags)
    }
  }
}

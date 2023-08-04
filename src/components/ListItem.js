import { h } from 'vue'
import { useInject } from '../core/data'

import IconClose from '../icons/IconClose.vue'

export default {
  props: {
    data: { type: Object, default: undefined },
    isHover: { type: Boolean, default: false },
    isSelected: { type: Boolean, default: false }
  },
  emits: ['select', 'hover'],
  setup (props, { emit }) {
    const { renderCell, rtl, removeItem } = useInject()

    return () => {
      const itemLabel = renderCell(props.data)

      const option = {
        class: {
          'sp-list-item': true,
          'sp-over': !props.isSelected && props.isHover,
          'sp-selected': props.isSelected,
          'sp-rtl': rtl
        },
        onClick: () => emit('select'),
        onMouseenter: () => emit('hover')
      }

      const items = [
        h('div', { title: itemLabel, innerHTML: itemLabel })
      ]

      if (props.isSelected) {
        const removeIconOption = {
          class: 'sp-list-item-remove',
          onClick: e => {
            e.stopPropagation()
            removeItem(props.data)
          }
        }
        items.push(
          h('div', removeIconOption, h(IconClose))
        )
      }

      return h('div', option, items)
    }
  }
}

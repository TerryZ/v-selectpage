import { h } from 'vue'
import { useInject } from '../core/list'

export default {
  props: {
    data: { type: Object, default: undefined },
    isHover: { type: Boolean, default: false },
    isSelected: { type: Boolean, default: false }
  },
  emits: ['select', 'hover'],
  setup (props, { emit }) {
    const { renderCell, rtl } = useInject()

    return () => {
      const content = renderCell(props.data)

      const option = {
        class: {
          'sp-list-item': true,
          'sp-over': props.isHover,
          'sp-selected': props.isSelected,
          'sp-rtl': rtl
        },
        title: content,
        innerHTML: content,
        onClick: e => emit('select'),
        onMouseenter: () => emit('hover')
      }

      return h('div', option)
    }
  }
}

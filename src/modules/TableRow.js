import { h } from 'vue'

import { useInject } from '../core/data'
import { parseWidth } from '../core/utilities'

export default {
  props: {
    columns: { type: Object, default: undefined },
    row: { type: Object, default: undefined },
    isHover: { type: Boolean, default: false },
    isSelected: { type: Boolean, default: false }
  },
  emits: ['select', 'hover'],
  setup (props, { emit }) {
    const { row } = props
    const { rtl } = useInject()

    const renderColumn = col => {
      if (!row || !Object.keys(row).length || !col?.data) return ''

      switch (typeof col.data) {
        case 'string': return row[col.data]
        case 'function': return col.data(row)
      }
    }

    return () => {
      // table row
      return h('tr', {
        class: {
          'sp-over': !props.isSelected && props.isHover,
          'sp-selected': props.isSelected,
          'sp-rtl': rtl
        },
        onClick: () => emit('select'),
        onMouseenter: () => emit('hover')
      }, props.columns.map((col, idx) => {
        const option = {
          key: idx,
          innerHTML: renderColumn(col)
        }
        if (Object.hasOwn(col, 'width')) {
          option.style = {
            width: parseWidth(col.width)
          }
        }
        // table cells
        return h('td', option)
      }))
    }
  }
}

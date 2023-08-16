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
      const option = {
        class: {
          'sp-over': !props.isSelected && props.isHover,
          'sp-selected': props.isSelected,
          'sp-rtl': rtl
        },
        onClick: () => emit('select'),
        onMouseenter: () => emit('hover')
      }
      const cells = props.columns.map((col, idx) => {
        const cellOption = {
          key: idx,
          innerHTML: renderColumn(col)
        }
        if (Object.hasOwn(col, 'width')) {
          cellOption.style = { width: parseWidth(col.width) }
        }
        return h('td', cellOption) // table data cell
      })
      // table row
      return h('tr', option, cells)
    }
  }
}

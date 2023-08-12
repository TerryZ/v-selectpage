import { h } from 'vue'

import '../styles/table-view.sass'
import { NOT_SELECTED } from '../core/constants'
import { useInject } from '../core/data'
import { listEmits, listProps } from '../core/list'

export default {
  name: 'SelectPageTable',
  props: {
    ...listProps(),
    columns: { type: Array, default: undefined }
  },
  emits: listEmits(),
  setup (props, { emit }) {
    const { isItemSelected, rtl } = useInject()

    const renderColumn = (row, col) => {
      if (!row || !Object.keys(row).length || !col || !col.data) return ''
      switch (typeof col.data) {
        case 'string': return row[col.data]
        case 'function': return col.data(row)
      }
    }

    return () => {
      const thCells = props.columns.map(val => h('th', val.title))
      const rows = props.list.map((row, index) => {
        // table row
        return h('tr', {
          key: index,
          class: {
            'sp-over': props.highlightIndex === index,
            'sp-selected': isItemSelected(row),
            'sp-rtl': rtl
          },
          onClick: e => {
            e.stopPropagation()
            emit('select', row)
          },
          onMouseenter: () => emit('set-highlight', index)
        }, props.columns.map((col, idx) => {
          // table cells
          return h('td', {
            key: idx,
            innerHTML: renderColumn(row, col)
          })
        }))
      })

      return h('table', { class: 'sp-table' }, [
        // table thead
        h('thead', h('tr', { class: { 'sp-rtl': rtl } }, thCells)),
        // table tbody
        h('tbody', { onMouseleave: () => emit('set-highlight', NOT_SELECTED) }, rows)
      ])
    }
  }
}

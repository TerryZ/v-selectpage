import { h } from 'vue'

import { useList, useInject } from '../core/list'

export default {
  name: 'SelectPageTable',
  props: {
    list: { type: Array, default: undefined },
    tbColumns: { type: Array, default: undefined }
  },
  setup (props, { emit }) {
    const { itemSelect, setItemHighlight, itemClasses } = useList(props, emit)
    const { isItemSelected, rtl } = useInject()

    const renderColumn = (row, col) => {
      if (!row || !Object.keys(row).length || !col || !col.data) return ''
      switch (typeof col.data) {
        case 'string': return row[col.data]
        case 'function': return col.data(row)
      }
    }

    return () => {
      const thCells = props.tbColumns.map(val => h('th', val.title))
      const rows = props.list.map((val, index) => {
        // table row
        return h('tr', {
          key: index,
          class: itemClasses(val, index),
          onClick: e => {
            e.stopPropagation()
            itemSelect(val)
          },
          onMouseenter: () => setItemHighlight(isItemSelected(val) ? -1 : index)
        }, props.tbColumns.map((col, idx) => { // table cells
          return h('td', {
            key: idx,
            innerHTML: renderColumn(val, col)
          })
        }))
      })

      return h('table', { class: 'sp-table' }, [
        // table thead
        h('thead', h('tr', { class: { 'sp-rtl': rtl } }, thCells)),
        // table tbody
        h('tbody', { onMouseleave: () => setItemHighlight(-1) }, rows)
      ])
    }
  }
}

import { h } from 'vue'

import '../styles/table-view.sass'
import { NOT_SELECTED } from '../core/constants'
import { useInject } from '../core/data'
import { listEmits, listProps } from '../core/list'

import TableRow from './TableRow'

export default {
  name: 'SelectPageTable',
  props: {
    ...listProps(),
    columns: { type: Array, default: undefined }
  },
  emits: listEmits(),
  setup (props, { emit }) {
    const { isItemSelected, rtl, keyProp } = useInject()

    return () => {
      const thCells = props.columns.map(val => h('th', val.title))
      const rows = props.list.map((row, index) => h(TableRow, {
        key: row[keyProp],
        row,
        columns: props.columns,
        isHover: props.highlightIndex === index,
        isSelected: isItemSelected(row),
        onSelect: () => emit('select', row),
        onHover: () => emit('set-highlight', index)
      }))

      return h('table', { class: 'sp-table' }, [
        // table thead
        h('thead', h('tr', { class: { 'sp-rtl': rtl } }, thCells)),
        // table tbody
        h('tbody', { onMouseleave: () => emit('set-highlight', NOT_SELECTED) }, rows)
      ])
    }
  }
}

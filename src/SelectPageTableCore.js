import { h } from 'vue'
import { selectPageProps, selectPageEmits } from './core/data'
import { useRender } from './core/render'

export default {
  props: {
    ...selectPageProps(),
    /**
     * the column setting for table view , format sample:
     *
     * {
     *   title: [string] - the title content text,
     *   data: [string|function] - specify column name to load data,
     * }
     *
     * @example
     * [
     *   {
     *     title: 'full name',
     *     data: function(row) {
     *       return row.lastName + ' ' + row.firstName
     *     }
     *   },
     *   { title: 'age', data: 'age'},
     *   {
     *     title: 'birthday',
     *     data: function(row) {
     *       return doSomeFormat(row.birthday)
     *     }
     *   }
     * ]
     */
    columns: { type: Array, default: undefined }
  },
  emits: selectPageEmits(),
  setup (props, { emit }) {
    const {
      renderSearch,
      renderMessage,
      renderPagination
    } = useRender(props, emit)

    return () => {
      return h('div', 'sp-table-view', [
        renderSearch(),
        renderMessage(),
        renderPagination()
      ])
    }
  }
}

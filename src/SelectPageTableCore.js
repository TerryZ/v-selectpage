import { h, defineComponent } from 'vue'
import { selectPageProps, selectPageEmits } from './core/data'
import { useRender } from './core/render'

export default defineComponent({
  props: {
    ...selectPageProps(),
    /**
     * table column settings
     */
    columns: { type: Array, default: undefined }
  },
  emits: selectPageEmits(),
  setup (props, { emit }) {
    const {
      renderSearch,
      renderMessage,
      renderTable,
      renderPagination
    } = useRender(props, emit)

    return () => {
      return h('div', 'sp-table-view', [
        renderSearch(),
        renderMessage(),
        renderTable(),
        renderPagination()
      ])
    }
  }
})

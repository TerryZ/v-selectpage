import { h, defineComponent } from 'vue'
import { selectPageProps, selectPageEmits } from './core/data'
import { useRender } from './core/render'

export default defineComponent({
  name: 'SelectPageTableCore',
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
      return h('div', { class: 'sp-container sp-table-view' }, [
        renderSearch(),
        renderMessage(),
        renderTable(),
        renderPagination()
      ])
    }
  }
})

import { defineComponent } from 'vue'
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
  setup (props, { emit, expose }) {
    const {
      selected,
      lang,
      removeAll,
      removeItem,
      setSearchFocus,
      renderCell,
      renderSearch,
      renderMessage,
      renderTable,
      renderPagination,
      renderContainer
    } = useRender(props, emit)

    expose({
      selected,
      lang,
      renderCell,
      removeAll,
      removeItem,
      setSearchFocus
    })

    return () => renderContainer([
      renderSearch(),
      renderMessage(),
      renderTable(),
      renderPagination()
    ])
  }
})

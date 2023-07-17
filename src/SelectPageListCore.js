import { selectPageProps, selectPageEmits } from './core/data'
import { useRender } from './core/render'

export default {
  props: {
    ...selectPageProps()
  },
  emits: selectPageEmits(),
  setup (props, { emit }) {
    const {
      renderSearch,
      renderMessage,
      renderList,
      renderPagination
    } = useRender(props, emit)

    return () => {
      return [
        renderSearch(),
        renderMessage(),
        renderList(),
        renderPagination()
      ]
    }
  }
}

import { selectPageProps } from './core/data'
import { useRender } from './core/render'

export default {
  props: {
    ...selectPageProps()
  },
  setup (props) {
    const {
      renderSearch,
      renderMessage,
      renderList,
      renderPagination
    } = useRender(props)

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

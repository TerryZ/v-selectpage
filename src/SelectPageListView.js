import { selectPageProps, useData } from './core/data'
import { useRender } from './core/render'

export default {
  props: {
    ...selectPageProps()
  },
  setup (props) {
    const { currentPage, totalRows } = useData(props)
    const {
      renderSearch,
      renderMessage,
      renderPagination
    } = useRender(props)
    return () => {
      return [
        renderSearch(),
        renderMessage(),
        renderPagination(currentPage, totalRows)
      ]
    }
  }
}

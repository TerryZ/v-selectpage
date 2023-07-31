import { h, defineComponent } from 'vue'

import { selectPageProps, selectPageEmits } from './core/data'
import { useRender } from './core/render'

export default defineComponent({
  name: 'SelectPageListCore',
  props: {
    ...selectPageProps()
  },
  emits: selectPageEmits(),
  setup (props, { emit, expose }) {
    const {
      selected,
      lang,
      renderCell,
      renderSearch,
      renderMessage,
      renderList,
      renderPagination
    } = useRender(props, emit)

    expose({
      selected,
      lang,
      renderCell
    })

    return () => {
      return h('div', { class: 'sp-container sp-list-view' }, [
        renderSearch(),
        renderMessage(),
        renderList(),
        renderPagination()
      ])
    }
  }
})

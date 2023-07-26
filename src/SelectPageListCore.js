import { h, defineComponent } from 'vue'

import { selectPageProps, selectPageEmits } from './core/data'
import { useRender } from './core/render'

export default defineComponent({
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
      return h('div', { class: 'sp-container sp-list-view' }, [
        renderSearch(),
        renderMessage(),
        renderList(),
        renderPagination()
      ])
    }
  }
})

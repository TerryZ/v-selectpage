import { h } from 'vue'

import { useInject } from '../core/data'

import IconTrash from '../icons/IconTrash.vue'

export default {
  setup (props, { emit }) {
    const { selectedCount, removeAll, language } = useInject()

    return () => {
      const items = []

      if (selectedCount.value) {
        const option = {
          title: language.clearAll,
          style: {
            display: 'inline-flex'
          },
          onClick: removeAll
        }
        items.push(
          h('div', option, h(IconTrash))
        )
      }

      return h('div', { class: 'sp-search-control' }, items)
    }
  }
}

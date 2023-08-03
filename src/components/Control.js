import { h } from 'vue'

import { useInject } from '../core/data'

import IconTrash from '../icons/IconTrash.vue'

export default {
  setup (props, { emit }) {
    const { haveSomeOneSelected, removeAll, language } = useInject()

    return () => {
      const items = []

      if (haveSomeOneSelected.value) {
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

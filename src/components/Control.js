import { h } from 'vue'

import { useInject } from '../core/data'

import IconTrash from '../icons/IconTrash.vue'

export default {
  setup (props, { emit }) {
    const { haveSomeOneSelected, removeAll, language } = useInject()

    return () => {
      const items = []

      if (haveSomeOneSelected.value) {
        items.push(
          h('div', { title: language.clearAll, onClick: removeAll }, h(IconTrash))
        )
      }

      return h('div', { class: 'sp-search-control' }, items)
    }
  }
}

import { h } from 'vue'

import { useInject } from '../core/data'

import CircleButton from '../components/CircleButton'
import IconTrash from '../icons/IconTrash.vue'

export default {
  setup (props, { emit }) {
    const { selectedCount, removeAll, language } = useInject()

    return () => {
      const items = []

      const option = {
        title: language.clearAll,
        size: 'large',
        // bgColor: '#f1f1f1',
        // hoverBgColor: '#ddd',
        disabled: !selectedCount.value,
        onClick: removeAll
      }
      items.push(
        h(CircleButton, option, h(IconTrash))
      )

      return h('div', { class: 'sp-search-control' }, items)
    }
  }
}

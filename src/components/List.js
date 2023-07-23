import { h } from 'vue'

import '../styles/list-view.sass'
import { listProps, listEmits, useList } from '../core/list'

import ListItem from './ListItem'

export default {
  name: 'SelectPageList',
  props: listProps(),
  emits: listEmits(),
  setup (props, { emit }) {
    const {
      highlightIndex,
      setItemHighlight,
      isPicked
    } = useList(props, emit)

    return () => {
      const items = props.list.map((item, index) => h(ListItem, {
        data: item,
        isHover: highlightIndex.value === index,
        isSelected: isPicked(item),
        onSelect: () => emit('select', item),
        onHover: () => setItemHighlight(index)
      }))
      const option = {
        class: 'sp-list',
        onMouseleave: () => setItemHighlight(-1)
      }
      return h('div', option, items)
    }
  }
}

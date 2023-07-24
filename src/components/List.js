import { h } from 'vue'

import '../styles/list-view.sass'
import { NOT_SELECTED } from '../core/constants'
import { listProps, listEmits } from '../core/list'
import { useInject } from '../core/data'

import ListItem from './ListItem'

export default {
  name: 'SelectPageList',
  props: listProps(),
  emits: listEmits(),
  setup (props, { emit }) {
    const { isItemSelected } = useInject()

    return () => {
      const items = props.list.map((item, index) => h(ListItem, {
        data: item,
        isHover: props.highlightIndex === index,
        isSelected: isItemSelected(item),
        onSelect: () => emit('select', item),
        onHover: () => emit('set-highlight', index)
      }))
      const option = {
        class: 'sp-list',
        onMouseleave: () => emit('set-highlight', NOT_SELECTED)
      }
      return h('div', option, items)
    }
  }
}

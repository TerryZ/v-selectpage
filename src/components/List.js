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
    // const { isPicked, showField, renderCell } = useInject()

    return () => h('div', {
      class: 'sp-list-view',
      onMouseleave: () => setItemHighlight(-1)
    }, props.list.map((item, index) => {
      // return h('li', {
      //   key: index,
      //   class: itemClasses(item, index),
      //   title: item[showField] || '',
      //   innerHTML: renderCell(item),
      //   onClick: e => {
      //     e.stopPropagation()
      //     itemSelect(item)
      //   },
      //   onMouseenter: () => setItemHighlight(isPicked(item) ? -1 : index)
      // })
      return h(ListItem, {
        data: item,
        isHover: highlightIndex.value === index,
        isSelected: isPicked(item),
        onSelect: () => emit('select', item),
        onHover: () => setItemHighlight(index)
      })
    }))
  }
}

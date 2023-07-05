import { h } from 'vue'

import { listProps, listEmits, useList, useInject } from '../core/list'

export default {
  name: 'SelectPageList',
  props: listProps(),
  emits: listEmits(),
  setup (props, { emit }) {
    const { itemSelect, setItemHighlight, itemClasses } = useList(props, emit)
    const { isPicked, showField, renderCell } = useInject()

    return () => h('ul', {
      class: 'sp-results',
      onMouseleave: () => setItemHighlight(-1)
    }, props.list.map((item, index) => {
      return h('li', {
        key: index,
        class: itemClasses(item, index),
        title: item[showField] || '',
        innerHTML: renderCell(item),
        onClick: e => {
          e.stopPropagation()
          itemSelect(item)
        },
        onMouseenter: () => setItemHighlight(isPicked(item) ? -1 : index)
      })
    }))
  }
}

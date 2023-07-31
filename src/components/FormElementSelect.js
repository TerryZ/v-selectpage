import { h } from 'vue'

import IconClose from '../icons/IconClose.vue'

export default {
  name: 'SelectPageSelect',
  props: {
    selected: { type: Array, default: undefined },
    disabled: { type: Boolean, default: false },
    placeholder: { type: String, default: '' },
    lang: { type: Object, default: undefined },
    renderCell: { type: Function, default: undefined }
  },
  emits: ['remove'],
  setup (props, { emit }) {
    const remove = () => emit('remove')

    return () => {
      const items = [
        h('div', { class: 'sp-input' }, props.selected?.length
          ? h('span', { innerHTML: props.renderCell(props.selected[0]) })
          : h('span', { class: 'sp-placeholder' }, props.placeholder || props.lang?.placeholder)
        )
      ]
      // clear button
      if (props.selected?.length && !props.disabled) {
        const option = {
          class: 'sp-clear',
          title: props.lang.clear,
          onClick: e => {
            e.stopPropagation()
            remove()
          }
        }
        items.push(h('div', option, h(IconClose)))
      }
      return h('div', { class: 'sp-trigger' }, items)
    }
  }
}

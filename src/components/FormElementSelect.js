import { h, toRef } from 'vue'

import IconClose from '../icons/IconClose.vue'

export default {
  name: 'SelectPageSelect',
  props: {
    selected: { type: Object, default: undefined },
    disabled: { type: Boolean, default: false },
    lang: { type: Object, default: undefined },
    renderCell: { type: Function, default: undefined }
  },
  emits: ['remove'],
  setup (props, { emit }) {
    const remove = () => emit('remove')

    const selected = toRef(props, 'selected')

    return () => {
      if (!selected.value?.length) return

      const items = [
        h('div', { class: 'sp-input' }, [
          h('span', { innerHTML: props.renderCell(selected.value[0]) })
        ])
      ]
      // clear button
      if (selected.value?.length && !props.disabled) {
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

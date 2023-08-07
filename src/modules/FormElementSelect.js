import { h, toRef } from 'vue'

import CircleButton from '../components/CircleButton'
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
    const selected = toRef(props, 'selected')

    return () => {
      if (!selected.value?.length) return

      const items = [
        h('div', { class: 'sp-select-content', innerHTML: props.renderCell(selected.value[0]) })
      ]
      // clear button
      if (selected.value?.length && !props.disabled) {
        const option = {
          title: props.lang.clear,
          onClick: e => {
            e.stopPropagation()
            emit('remove')
          }
        }
        items.push(
          h(CircleButton, option, () => h(IconClose))
        )
      }
      return h('div', { class: 'sp-trigger sp-select' }, items)
    }
  }
}

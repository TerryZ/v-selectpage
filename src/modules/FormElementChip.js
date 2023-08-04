import { h, toRef } from 'vue'

import IconClose from '../icons/IconClose.vue'

export default {
  name: 'SelectPageChip',
  props: {
    selected: { type: Object, default: undefined },
    disabled: { type: Boolean, default: false },
    renderCell: { type: Function, default: undefined }
  },
  emits: ['remove'],
  setup (props, { emit }) {
    const selected = toRef(props, 'selected')

    return () => {
      const chips = selected.value.map((item, index) => {
        const chip = [h('div', { innerHTML: props.renderCell(item) })]
        // close icon for chip
        if (!props.disabled) {
          chip.push(
            h('div', {
              class: 'sp-chip-remove',
              onClick: e => {
                e.stopPropagation()
                emit('remove', item)
              }
            }, h(IconClose))
          )
        }
        return h('div', { class: 'sp-chip', key: index }, chip)
      })
      return h('div', { class: 'sp-trigger sp-chips' }, chips)
    }
  }
}

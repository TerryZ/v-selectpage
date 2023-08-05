import { h, toRef } from 'vue'

import CircleButton from '../components/CircleButton'
import IconClose from '../icons/IconClose.vue'

export default {
  name: 'SelectPageChips',
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
        const chip = [
          h('div', { class: 'sp-chip--body', innerHTML: props.renderCell(item) })
        ]
        // close icon for chip
        if (!props.disabled) {
          const chipOption = {
            size: 'small',
            hoverBgColor: '#fff',
            onClick: e => {
              e.stopPropagation()
              emit('remove', item)
            }
          }
          chip.push(
            h(CircleButton, chipOption, () => h(IconClose))
          )
        }
        return h('div', { class: 'sp-chip', key: index }, chip)
      })
      return h('div', { class: 'sp-trigger sp-chips' }, chips)
    }
  }
}

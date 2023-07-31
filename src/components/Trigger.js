import { h } from 'vue'

import '../styles/trigger.sass'

import FormElementSelect from '../components/FormElementSelect'
import FormElementTag from '../components/FormElementTag'

import IconChevronDown from '../icons/IconChevronDown.vue'

export default {
  props: {
    dropdownVisible: { type: Boolean, default: false },
    selected: { type: Array, default: undefined },
    disabled: { type: Boolean, default: false },
    placeholder: { type: String, default: '' },
    lang: { type: Object, default: undefined },
    renderCell: { type: Function, default: undefined }
  },
  emits: ['remove'],
  setup (props, { emit }) {
    return () => {
      const option = {
        selected: props.selected,
        disabled: props.disabled,
        placeholder: props.placeholder,
        lang: props.lang,
        renderCell: props.renderCell,
        onRemove () {
          emit('remove')
        }
      }

      const items = [
        h(props.multiple ? FormElementTag : FormElementSelect, option)
      ]

      items.push(h(IconChevronDown))

      const btnOption = {
        class: ['sp-trigger-container', { 'sp-opened': props.dropdownVisible }]
      }

      return h('div', btnOption, items)
    }
  }
}

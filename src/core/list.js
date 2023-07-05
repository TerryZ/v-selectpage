import { inject } from 'vue'

export const listProps = () => ({
  list: { type: Array, default: undefined },
  picked: { type: Array, default: undefined },
  modelValue: { type: Number, default: undefined }
})

export const listEmits = () => ['select', 'update:modelValue']

export function useInject () {
  return {
    keyField: inject('keyField'),
    showField: inject('showField'),
    renderCell: inject('renderCell'),
    rtl: inject('rtl'),
    isPicked: inject('inPicked'),
    language: inject('language')
  }
}

export function useList (props, emit) {
  const { isPicked, rtl } = useInject()

  const itemSelect = data => {
    emit('select', data)
  }
  const setItemHighlight = index => {
    emit('update:modelValue', index)
  }
  const itemClasses = (data, index) => ({
    'sp-over': props.modelValue === index,
    'sp-selected': isPicked(data),
    'sp-rtl': rtl
  })
  return {
    itemSelect,
    setItemHighlight,
    itemClasses
  }
}

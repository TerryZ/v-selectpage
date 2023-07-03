export const listProps = {
  list: Array,
  picked: Array,
  modelValue: { type: Number, default: undefined }
}

export const listEmits = ['select', 'update:modelValue']

export function useList (props, emit) {
  const itemSelect = data => {
    emit('select', data)
  }
  const setItemHighlight = index => {
    emit('update:modelValue', index)
  }
  const itemClasses = (data, index) => ({
    'sp-over': props.modelValue === index,
    'sp-selected': this.inPicked(data),
    'sp-rtl': this.rtl
  })
  return {
    itemSelect,
    setItemHighlight,
    itemClasses
  }
}

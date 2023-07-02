export default {
  inject: ['keyField', 'showField', 'renderCell', 'rtl', 'inPicked'],
  props: {
    list: Array,
    picked: Array,
    value: Number
  },
  methods: {
    rowClick (row) {
      this.$emit('select', row)
    },
    rowClass (row, index) {
      return {
        'sp-over': this.value === index,
        'sp-selected': this.inPicked(row),
        'sp-rtl': this.rtl
      }
    },
    highlight (index) {
      this.$emit('input', index)
    }
  }
}

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

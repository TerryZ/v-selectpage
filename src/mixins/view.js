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

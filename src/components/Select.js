export default {
  name: 'SelectPageSelect',
  props: {
    picked: Array,
    disabled: Boolean,
    placeholder: String
  },
  inject: ['i18n', 'renderCell'],
  render (h) {
    const children = []
    let result = null
    if (this.picked && this.picked.length) {
      result = h('span', { domProps: { innerHTML: this.renderCell(this.picked[0]) } })
    } else {
      result = h('span', { class: 'sp-placeholder' }, this.placeholder)
    }
    children.push(h('div', { class: 'sp-base sp-input' }, [result]))
    // clear button
    if (this.picked && this.picked.length && !this.disabled) {
      children.push(h('div', {
        class: 'sp-clear',
        attrs: {
          title: this.i18n.clear
        },
        on: {
          click: e => {
            e.stopPropagation()
            this.remove()
          }
        }
      }, [h('i', { class: 'sp-iconfont sp-icon-close' })]))
    }
    return h('div', children)
  },
  methods: {
    remove () {
      this.$emit('remove')
    }
  }
}

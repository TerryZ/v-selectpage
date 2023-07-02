import { h } from 'vue'

export default {
  name: 'SelectPageList',
  setup (props) {
    return () => h('ul', {
      class: 'sp-results',
      onMouseleave: () => this.highlight(-1)
    }, this.list.map((val, index) => {
      return h('li', {
        key: index,
        class: this.rowClass(val, index),
        title: val[this.showField] || '',
        innerHTML: this.renderCell(val),
        onClick: e => {
          e.stopPropagation()
          this.rowClick(val)
        },
        onMouseenter: () => this.highlight(this.inPicked(val) ? -1 : index)
      })
    }))
  }
}

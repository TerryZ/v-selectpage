import './styles/selectpage.styl'
import dropdown from 'v-dropdown'

import data from './mixins/data'
import methods from './mixins/methods'
import util from './mixins/util'
import render from './mixins/render'

export default {
  name: 'v-selectpage',
  mixins: [data, methods, util, render],
  components: {
    'v-dropdown': dropdown,
    'sp-tag': () => import('./components/Tag'),
    'sp-select': () => import('./components/Select'),
    'sp-page': () => import('./components/Pagination'),
    'sp-list': () => import('./components/List'),
    'sp-table': () => import('./components/Table')
  },
  provide () {
    return {
      i18n: this.i18n,
      renderCell: this.renderCell,
      keyField: this.keyField,
      showField: this.showField,
      inPicked: this.inPicked,
      rtl: this.rtl
    }
  },
  mounted () {
    // set searchField when user not config
    if (!this.searchField) {
      if (typeof this.showField === 'string') {
        this.searchColumn = this.showField
      } else if (Array.isArray(this.showField) && this.showField.length) {
        this.searchColumn = this.showField[0].data
      }
    } else this.searchColumn = this.searchField

    // sort data list
    this.sortList()
    this.initSelection()
  }
}

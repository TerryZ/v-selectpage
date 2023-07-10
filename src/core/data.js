import { EN } from '../language'

export function selectPageProps () {
  return {
    /**
     * specify key to make list item selected, the must be match 'keyField' option value
     *
     * example:
     * single mode: '123'
     * multiple mode: '123, 124, 125'
     */
    value: { type: String, default: '' },
    data: { type: [Array, String], required: true },
    /**
     * server side querying params
     */
    params: Object,
    /**
     * server side result format
     * @param resp [object] server side request result
     * @return [object] the formatted data
     */
    resultFormat: Function,
    title: { type: String, default: 'SelectPage' },
    placeholder: { type: String, default: '' },
    multiple: { type: Boolean, default: false },
    language: { type: String, default: EN },
    /**
     * specify field to be key field, the value will return by v-model
     */
    keyField: { type: String, default: 'id' },
    /**
     * specify field to display
     */
    showField: { type: [String, Function], default: 'name' },
    /**
     * the column setting for table view , format sample:
     *
     * {
     *   title: [string] - the title content text,
     *   data: [string|function] - specify column name to load data,
     * }
     *
     * @example
     * [
     *   { title: 'full name', data: function(row){ return row.lastName + ' ' + row.firstName }},
     *   { title: 'age', data: 'age'},
     *   { title: 'birthday', data: function(row){ return doSomeFormat(row.birthday) }}
     * ]
     */
    columns: { type: Array, default: undefined },
    /**
     * sort config, use space to split field name and sort order
     * @example 'name desc'
     */
    sort: String,
    searchField: String,
    pageSize: { type: Number, default: 10 },
    /**
     * max selected item limit, set 0 to unlimited
     */
    maxSelectLimit: { type: Number, default: 0 },
    /**
     * pagination bar
     */
    pagination: { type: Boolean, default: true },
    /**
     * make row text and drop down container align to right
     */
    rtl: { type: Boolean, default: false },
    /**
     * the width of drop down menu
     */
    width: { type: Number, default: undefined },
    disabled: { type: Boolean, default: false }
  }
}

export function useData (props) {

}

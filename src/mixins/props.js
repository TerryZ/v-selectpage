export default {
    props: {
        /**
         * specify key to make list item selected, the must be match 'keyField' option value
         *
         * example:
         * single mode: '123'
         * multiple mode: '123, 124, 125'
         */
        value: String,
        data: {
            type: [Array, String],
            required: true
        },
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
        title: {
            type: String,
            default: 'SelectPage'
        },
        placeholder: {
            type: String,
            default: ''
        },
        multiple: {
            type: Boolean,
            default: false
        },
        language: {
            type: String,
            default: 'cn'
        },
        keyField: {
            type: String,
            default: 'id'
        },
        /**
         * specify field to show in row
         */
        showField: {
            type: [String, Function],
            default: 'name'
        },
        /**
         * table mode to show data, format sample:
         * title: [string] - the title content text,
         * data: [string|function] - specify column name to load data,
         * [
         *      {title: 'full name', data: function(row){ return row.lastName + ' ' + row.firstName; }},
         *      {title: 'age', data: 'age'},
         *      {title: 'birthday', data: function(row){ return someformat(row.birthday); }}
         * ]
         */
        tbColumns:  Array,
        /**
         * sort config, use space to split field name and sort order
         * example: 'name desc'
         */
        sort: String,
        searchField: String,
        pageSize:{
            type: Number,
            default: 10
        },
        /**
         * max selected item limit, set 0 to unlimited
         */
        maxSelectLimit: {
            type: Number,
            default: 0
        },
        pagination: {
            type: Boolean,
            default: true
        },
        /**
         * make row text and drop down container align to right
         */
        rtl: {
            type: Boolean,
            default: false
        },
        /**
         * the width of drop down menu
         */
        width: Number,
        disabled: {
            type: Boolean,
            default: false
        },
        deselectFromList: {
          type: Boolean,
          default: false
        },
    }
};
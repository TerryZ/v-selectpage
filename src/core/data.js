import { ref, provide, watch, computed, inject, onMounted } from 'vue'
import { FIRST_PAGE, DEFAULT_PAGE_SIZE } from './constants'
import { EN } from '../language'
import { useLanguage } from './helper'
import { isEmptyArray } from './utilities'

export function selectPageProps () {
  return {
    /**
     * specify key to make list item selected, the must be match 'keyProp' option value
     *
     * example:
     * single mode: '123'
     * multiple mode: '123, 124, 125'
     */
    modelValue: { type: Array, default: undefined },
    data: { type: Array, default: undefined },
    title: { type: String, default: 'SelectPage' },
    placeholder: { type: String, default: '' },
    /** multiple selection */
    multiple: { type: Boolean, default: false },
    language: { type: String, default: EN },
    /**
     * specify field to be key field, the value will return by v-model
     */
    keyProp: { type: String, default: 'id' },
    /**
     * specify field to display
     */
    labelProp: { type: [String, Function], default: 'name' },
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
     *   {
     *     title: 'full name',
     *     data: function(row) {
     *       return row.lastName + ' ' + row.firstName
     *     }
     *   },
     *   { title: 'age', data: 'age'},
     *   {
     *     title: 'birthday',
     *     data: function(row) {
     *       return doSomeFormat(row.birthday)
     *     }
     *   }
     * ]
     */
    columns: { type: Array, default: undefined },
    /**
     * sort config, use space to split field name and sort order
     * @example 'name desc'
     */
    sort: String,
    searchField: String,
    pageSize: { type: Number, default: DEFAULT_PAGE_SIZE },
    totalRows: { type: Number, default: 0 },
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
    disabled: { type: Boolean, default: false },
    /** debounce delay when typing, in milliseconds */
    debounce: { type: Number, default: 300 }
  }
}

export function selectPageEmits () {
  return [
    'update:modelValue',
    'fetch-data',
    'fetch-selected-data',
    'selection-change'
  ]
}

export function useData (props, emit) {
  const lang = useLanguage(props.language)

  // query string for search input
  const query = ref('')
  // alert message
  const message = ref('')
  const currentPage = ref(FIRST_PAGE)
  // select items
  const picked = ref([])

  const haveItemSelected = computed(() => {
    return !!picked.value.length
  })

  const renderCell = function (row) {
    if (!row || !Object.keys(row).length) return ''
    switch (typeof props.labelProp) {
      case 'string': return row[props.labelProp]
      case 'function': return props.labelProp(row)
    }
  }
  const isDataEmpty = () => isEmptyArray(props.data)

  const isPicked = row => {
    if (!picked.value.length) return false
    return picked.value.some(val => val[props.keyProp] === row[props.keyProp])
  }
  const selectItem = row => {
    if (isPicked(row)) return

    if (props.multiple) {
      picked.value.push(row)
      return
    }
    picked.value = [row]
  }
  function fetchData () {
    emit('fetch-data', {
      search: query.value,
      pageNumber: currentPage.value,
      pageSize: props.pageSize
    })
  }
  function fetchSelectedData () {
    emit('fetch-selected-data', props.modelValue, data => {
      if (isEmptyArray(data)) return
      picked.value = data
    })
  }
  function removeAll () {
    picked.value = []
  }
  function removeItem (row) {
    picked.value = picked.value.filter(val => {
      return val[props.keyProp] !== row[props.keyProp]
    })
  }

  provide('rtl', props.rtl)
  provide('pageSize', props.pageSize)
  provide('debounce', props.debounce)
  provide('language', lang)
  provide('renderCell', renderCell)
  provide('isPicked', isPicked)
  provide('haveItemSelected', haveItemSelected)
  provide('removeAll', removeAll)
  provide('removeItem', removeItem)

  watch(picked, val => {
    emit('update:modelValue', val.map(value => value[props.keyProp]))
    emit('selection-change', val)
  })
  watch(query, () => {
    // reset current page to first page when query keyword change
    currentPage.value = FIRST_PAGE
    fetchData()
  })

  onMounted(() => {
    fetchData()
    if (!isEmptyArray(props.modelValue)) {
      fetchSelectedData()
    }
  })

  return {
    query,
    message,
    currentPage,
    lang,

    renderCell,
    isDataEmpty,
    isPicked,
    haveItemSelected,
    selectItem,
    removeAll,
    fetchData
  }
}

export function useInject () {
  return {
    // keyProp: inject('keyProp'),
    // labelProp: inject('labelProp'),
    renderCell: inject('renderCell'),
    rtl: inject('rtl'),
    isPicked: inject('isPicked'),
    pageSize: inject('pageSize'),
    language: inject('language'),
    debounce: inject('debounce'),
    haveItemSelected: inject('haveItemSelected'),
    removeAll: inject('removeAll'),
    removeItem: inject('removeItem')
  }
}

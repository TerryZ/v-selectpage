import { ref, provide, watch, inject, onMounted, toRef } from 'vue'
import { FIRST_PAGE, DEFAULT_PAGE_SIZE, UNLIMITED, LANG_MAX_SELECTED_LIMIT } from './constants'
import { EN } from '../language'
import { useLanguage, useDebounce } from './helper'
import { useItemSelection } from './list'
import { isEmptyArray } from './utilities'

export function selectPageProps () {
  return {
    /**
     * binding selected item keys, it must be match 'keyProp' option value
     */
    modelValue: { type: Array, default: undefined },
    data: { type: Array, default: undefined },
    placeholder: { type: String, default: '' },
    /** multiple selection */
    multiple: { type: Boolean, default: false },
    /** data loading state, recommended to use it with the `fetch-data` event */
    loading: { type: Boolean, default: false },
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
    pageSize: { type: Number, default: DEFAULT_PAGE_SIZE },
    /** total rows count */
    totalRows: { type: Number, default: 0 },
    /**
     * maximum number of selection, set 0 to unlimited
     * depend on `multiple` prop set to true
     */
    max: { type: Number, default: UNLIMITED, validator: (val) => val >= 0 },
    /**
     * pagination bar
     */
    pagination: { type: Boolean, default: true },
    /**
     * text written from right to left
     */
    rtl: { type: Boolean, default: false },
    /**
     * the width of drop down menu
     */
    width: { type: Number, default: undefined },
    /** debounce delay when typing, in milliseconds */
    debounce: { type: Number, default: 300 }
  }
}

export function selectPageEmits () {
  return [
    'update:modelValue',
    'fetch-data',
    'fetch-selected-data',
    'selection-change',
    'remove',
    'close-dropdown',
    'adjust-dropdown'
  ]
}

export function useData (props, emit) {
  const lang = useLanguage(props.language)
  const {
    selected,
    selectedCount,
    isItemSelected,
    removeAll,
    removeItem,
    selectItem,
    setSelected
  } = useItemSelection(props, emit)

  // query string for search input
  const query = ref('')
  // alert message
  const message = ref('')
  // current page number
  const currentPage = ref(FIRST_PAGE)

  const messageDebounce = useDebounce()

  const isDataEmpty = () => isEmptyArray(props.data)
  const renderCell = row => {
    if (!row || !Object.keys(row).length) return ''
    switch (typeof props.labelProp) {
      case 'string': return row[props.labelProp]
      case 'function': return props.labelProp(row)
    }
  }
  const checkAndSelectItem = row => {
    if (props.max === UNLIMITED) {
      return selectItem(row)
    }
    if (selected.value.length === props.max) {
      message.value = lang.maxSelected.replace(LANG_MAX_SELECTED_LIMIT, props.max)

      messageDebounce(() => { message.value = '' })
      return
    }
    selectItem(row)
  }
  const fetchData = () => {
    emit('fetch-data', {
      search: query.value,
      pageNumber: currentPage.value,
      pageSize: props.pageSize
    })
  }
  const fetchSelectedData = () => {
    if (!Array.isArray(props.modelValue)) return

    // empty array will not emit event
    if (!props.modelValue.length) {
      setSelected([], false)
      return
    }

    const keys = props.multiple ? props.modelValue : [props.modelValue[0]]

    emit('fetch-selected-data', keys, data => {
      if (!Array.isArray(data)) return
      setSelected(data, props.modelValue.length !== data.length)
    })
  }

  provide('rtl', props.rtl)
  provide('pageSize', props.pageSize)
  provide('debounce', props.debounce)
  provide('multiple', props.multiple)
  provide('loading', toRef(props, 'loading'))
  provide('language', lang)
  provide('renderCell', renderCell)
  provide('isItemSelected', isItemSelected)
  provide('selectedCount', selectedCount)
  provide('removeAll', removeAll)
  provide('removeItem', removeItem)

  watch(query, () => {
    // reset current page to first page when query keyword change
    currentPage.value = FIRST_PAGE
    fetchData()
  })

  watch(() => props.modelValue, fetchSelectedData)

  onMounted(() => {
    fetchData()
    if (!isEmptyArray(props.modelValue)) {
      fetchSelectedData()
    }
  })

  return {
    selected,
    query,
    message,
    currentPage,
    lang,

    renderCell,
    isDataEmpty,
    isItemSelected,
    selectedCount,
    selectItem: checkAndSelectItem,
    removeAll,
    removeItem,
    fetchData
  }
}

export function useInject () {
  return {
    renderCell: inject('renderCell'),
    rtl: inject('rtl'),
    isItemSelected: inject('isItemSelected'),
    pageSize: inject('pageSize'),
    language: inject('language'),
    debounce: inject('debounce'),
    multiple: inject('multiple'),
    loading: inject('loading'),
    selectedCount: inject('selectedCount'),
    removeAll: inject('removeAll'),
    removeItem: inject('removeItem')
  }
}

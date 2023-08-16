import { ref } from 'vue'
import { list1 } from './example-data'

export function useSelectPageHandle () {
  const totalRows = ref(0)
  // local data list pagination
  function fetchData (data, callback) {
    const { search, pageNumber, pageSize } = data
    const start = (pageNumber - 1) * pageSize
    const end = start + pageSize - 1

    const list = search ? list1.filter(val => val.name.includes(search)) : list1
    // update total rows
    totalRows.value = list.length

    setTimeout(() => {
      callback(
        list.filter((val, index) => index >= start && index <= end)
      )
    }, 500)
  }
  /**
   * Fetch selected item models
   * @param {Array} data selected item keys
   * @param {function} callback a function to send data models back
   */
  function fetchSelectedData (data, callback) {
    callback(
      list1.filter(val => data.includes(val.id))
    )
  }
  function selectionChange (data) {
    console.log(data)
  }
  function remove (data) {
    console.log(data)
  }
  function labelFormatter (row) {
    return `${row.name} (id: ${row.id})`
  }

  return {
    totalRows,
    fetchData,
    fetchSelectedData,
    selectionChange,
    remove,
    labelFormatter
  }
}

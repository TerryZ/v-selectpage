import { list1 } from './example-data'

export function useSelectPageHandle () {
  // local data list pagination
  function fetchData (data, callback) {
    const { search, pageNumber, pageSize } = data

    const start = (pageNumber - 1) * pageSize
    const end = start + pageSize - 1

    const list = search
      ? list1.filter(val => val.name.includes(search))
      : list1

    const result = pageSize === 0
      ? list
      : list.filter((val, index) => index >= start && index <= end)

    setTimeout(() => callback(result, list.length), 500)
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
    fetchData,
    fetchSelectedData,
    selectionChange,
    remove,
    labelFormatter
  }
}

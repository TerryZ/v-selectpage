import { list1 } from './example-data'

export function useSelectPageHandle () {
  function dataHandle (data) {
    const { search, pageNumber, pageSize } = data

    const start = (pageNumber - 1) * pageSize
    const end = start + pageSize - 1

    const list = search
      ? list1.filter(val => val.name.includes(search))
      : list1

    const result = pageSize === 0
      ? list
      : list.filter((val, index) => index >= start && index <= end)
    return {
      list: result,
      count: list.length
    }
  }
  // local data list pagination
  function fetchData (data, callback) {
    const result = dataHandle(data)

    setTimeout(() => callback(result.list, result.count), 500)
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
    dataHandle,
    fetchData,
    fetchSelectedData,
    selectionChange,
    remove,
    labelFormatter
  }
}

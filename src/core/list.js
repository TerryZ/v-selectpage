import { ref, computed } from 'vue'

import { NOT_SELECTED, operationKeyCodes, UP, DOWN } from './constants'
import { isEmptyArray } from './utilities'

export const listProps = () => ({
  list: { type: Array, default: undefined },
  highlightIndex: { type: Number, default: NOT_SELECTED }
})

export const listEmits = () => ['select', 'set-highlight']

/** list item manager */
export function useItemSelection (props, emit) {
  const selected = ref([])

  const selectedCount = computed(() => selected.value.length)

  function isItemSelected (row) {
    if (!selected.value.length) return false
    return selected.value.some(val => val[props.keyProp] === row[props.keyProp])
  }
  function isKeySelected (key) {
    if (!selected.value.length) return false
    if (typeof key === 'undefined') return false
    return selected.value.some(entry => entry[props.keyProp] === key)
  }
  function isKeysEqualToSelected (keys) {
    // ensure the uniqueness of the keys
    const keySet = new Set(keys)

    if (keySet.size !== selected.value.length) return false

    return Array.from(keySet).every(isKeySelected)
  }
  function selectItem (row) {
    if (isItemSelected(row)) return

    if (props.multiple) {
      setSelected([...selected.value, row])
      return
    }
    setSelected([row])
  }
  function removeAll () {
    emit('remove', selected.value)
    setSelected([])
  }
  function removeItem (row) {
    emit('remove', [row])
    setSelected(
      selected.value.filter(val => {
        return val[props.keyProp] !== row[props.keyProp]
      })
    )
  }
  function setSelected (data, updateVModel = true) {
    selected.value = data
    if (updateVModel) {
      emit('update:modelValue', data.map(value => value[props.keyProp]))
    }
    emit('selection-change', data)
  }

  return {
    selected,
    selectedCount,
    isItemSelected,
    selectItem,
    removeItem,
    removeAll,
    setSelected,
    isKeysEqualToSelected
  }
}

export function useListItemHighlight (props, emit, list) {
  const highlightIndex = ref(NOT_SELECTED)

  function setItemHighlight (index) {
    highlightIndex.value = index
  }
  function moveUp () {
    if (highlightIndex.value === NOT_SELECTED) return
    if (highlightIndex.value === 0) return
    highlightIndex.value -= 1
  }
  function moveDown () {
    if (isEmptyArray(list.value)) return
    if (highlightIndex.value === (list.value.length - 1)) return
    highlightIndex.value += 1
  }
  function highlightNavigation (keyCode) {
    if (keyCode === UP) return moveUp()
    if (keyCode === DOWN) return moveDown()
  }
  function isSomeRowHighlight () {
    return highlightIndex.value !== NOT_SELECTED
  }

  return {
    highlightIndex,
    setItemHighlight,
    highlightNavigation,
    isSomeRowHighlight
  }
}

export function isOperationKey (keyCode) {
  return operationKeyCodes.includes(keyCode)
}

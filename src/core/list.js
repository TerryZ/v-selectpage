import { ref, computed, watch } from 'vue'

import { NOT_SELECTED, operationKeyCodes, UP, DOWN } from './constants'
import { isEmptyArray } from './utilities'

export const listProps = () => ({
  list: { type: Array, default: undefined },
  highlightIndex: { type: Number, default: NOT_SELECTED }
})

export const listEmits = () => ['select', 'update:modelValue', 'set-highlight']

// list item manager
export function useItemSelection (props, emit) {
  const selected = ref([])

  const haveSomeOneSelected = computed(() => {
    return !!selected.value.length
  })

  const isItemSelected = row => {
    if (!selected.value.length) return false
    return selected.value.some(val => val[props.keyProp] === row[props.keyProp])
  }
  const selectItem = row => {
    if (isItemSelected(row)) return

    if (props.multiple) {
      selected.value.push(row)
      return
    }
    selected.value = [row]
  }
  const removeAll = () => {
    selected.value = []
  }
  const removeItem = function (row) {
    selected.value = selected.value.filter(val => {
      return val[props.keyProp] !== row[props.keyProp]
    })
  }

  watch(selected, val => {
    emit('update:modelValue', val.map(value => value[props.keyProp]))
    emit('selection-change', val)
  })

  return {
    selected,
    haveSomeOneSelected,
    isItemSelected,
    selectItem,
    removeItem,
    removeAll
  }
}

export function useListItemHighlight (props, emit) {
  const highlightIndex = ref(NOT_SELECTED)

  const setItemHighlight = index => {
    highlightIndex.value = index
  }

  const moveUp = () => {
    if (highlightIndex.value === NOT_SELECTED) return
    if (highlightIndex.value === 0) return
    highlightIndex.value -= 1
  }
  const moveDown = () => {
    if (isEmptyArray(props.data)) return
    if (highlightIndex.value === (props.data.length - 1)) return
    highlightIndex.value += 1
  }

  const keyboardNavigation = keyCode => {
    if (!operationKeyCodes.includes(keyCode)) return

    switch (keyCode) {
      case UP: return moveUp()
      case DOWN: return moveDown()
    }
  }

  return {
    highlightIndex,

    setItemHighlight,
    keyboardNavigation
  }
}

export function isOperationKey (keyCode) {
  return operationKeyCodes.includes(keyCode)
}

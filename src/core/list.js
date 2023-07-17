import { ref } from 'vue'

import { useInject } from './data'

export const listProps = () => ({
  list: { type: Array, default: undefined },
  picked: { type: Array, default: undefined },
  modelValue: { type: Number, default: undefined }
})

export const listEmits = () => ['select', 'update:modelValue']

export function useList (props, emit) {
  const highlightIndex = ref(-1)

  const { isPicked, rtl } = useInject()

  const itemSelect = data => {
    emit('select', data)
  }
  const setItemHighlight = index => {
    highlightIndex.value = index
  }
  const itemClasses = (data, index) => ({
    'sp-over': props.modelValue === index,
    'sp-selected': isPicked(data),
    'sp-rtl': rtl
  })
  return {
    highlightIndex,

    itemSelect,
    setItemHighlight,
    itemClasses,

    isPicked
  }
}

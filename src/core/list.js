import { ref } from 'vue'

import { useInject } from './data'

export const listProps = () => ({
  list: { type: Array, default: undefined }
})

export const listEmits = () => ['select', 'update:modelValue']

export function useList (props, emit) {
  const highlightIndex = ref(-1)

  const { isPicked } = useInject()

  const setItemHighlight = index => {
    highlightIndex.value = index
  }
  return {
    highlightIndex,

    setItemHighlight,

    isPicked
  }
}

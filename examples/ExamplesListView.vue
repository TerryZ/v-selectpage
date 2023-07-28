<template>
  <div class="p-3">
    <h1>List View 列表视图</h1>

    <h4>使用内置按钮</h4>
    <div>
      <SelectPageList
        :data="data1"
        :total-rows="totalRows"
        :loading="loading"
        language="zh-chs"
        class=""
        v-model="selected"
        @selection-change="selectionChange"
        @fetch-data="fetchData"
        @fetch-selected-data="fetchSelectedData"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

import { SelectPageList } from '@/'
import { list1 } from './data'

const data1 = ref([])
const selected = ref([23])
const totalRows = ref(0)
const loading = ref(false)

// local data list pagination
function fetchData (data) {
  loading.value = true
  const { search, pageNumber, pageSize } = data
  const start = (pageNumber - 1) * pageSize
  const end = start + pageSize - 1

  const list = search ? list1.filter(val => val.name.includes(search)) : list1
  totalRows.value = list.length

  setTimeout(() => {
    data1.value = list.filter((val, index) => index >= start && index <= end)
    loading.value = false
  }, 500)
}
function fetchSelectedData (data, callback) {
  callback(
    list1.filter(val => data.includes(val.id))
  )
}
function selectionChange (data) {
  console.log(data)
}
</script>

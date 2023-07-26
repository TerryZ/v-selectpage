<template>
  <div class="p-3">
    <h3>核心模块</h3>

    <h5>List View 列表视图</h5>
    <div class="row">
      <div class="col-md-6">
        <div class="mb-3">
          选择的项目 key:
          <span
            class="bg-light py-1 px-2 rounded-3 ms-2"
            v-text="selected.toString()"
          />
        </div>
        <div>
          <SelectPageListCore
            :data="data1"
            :total-rows="totalRows"
            :loading="loading"
            language="zh-chs"
            class="shadow-sm rounded-3 border overflow-hidden"
            v-model="selected"
            @selection-change="selectionChange"
            @fetch-data="fetchData"
            @fetch-selected-data="fetchSelectedData"
          />
        </div>
      </div>
      <div class="col-md-6">
        <div class="mb-3">
          选择的项目 key: <span v-text="selected1.toString()" />
        </div>
        <div>
          <SelectPageListCore
            :data="data1"
            :total-rows="totalRows"
            :label-prop="labelFormatter"
            :multiple="true"
            class="shadow-sm rounded-3 border overflow-hidden"
            v-model="selected1"
            @selection-change="selectionChange"
            @fetch-data="fetchData"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

import { list1 } from './data'

import { SelectPageListCore } from '@/'

const data1 = ref([])
const selected = ref([23])
const selected1 = ref([])
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
  }, 1000)
}
function fetchSelectedData (data, callback) {
  callback(
    list1.filter(val => data.includes(val.id))
  )
}
function selectionChange (data) {
  console.log(data)
}

function labelFormatter (row) {
  return `${row.name} (id: ${row.id})`
}
</script>

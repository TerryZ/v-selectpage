<template>
  <div class="p-3">
    <h3>核心模块</h3>

    <h5>List View 列表视图</h5>
    <div class="row">
      <div class="col-md-6">
        <div class="mb-3">
          <SelectPageListCore
            :data="data1"
            :total-rows="totalRows"
            language="zh-chs"
            class="shadow-sm rounded-3 border overflow-hidden"
            v-model="selected"
            @selection-change="selectionChange"
            @fetch-data="fetchData"
          />
        </div>
        <div>
          选择的项目 key: <span v-text="selected.toString()" />
        </div>
      </div>
      <div class="col-md-6">
        <div class="mb-3">
          <SelectPageListCore
            :data="data1"
            :total-rows="totalRows"
            :label-prop="labelFormatter"
            class="shadow-sm rounded-4 border overflow-hidden"
            v-model="selected1"
            @selection-change="selectionChange"
            @fetch-data="fetchData"
          />
        </div>
        <div>
          选择的项目 key: <span v-text="selected1.toString()" />
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
const selected = ref([3])
const selected1 = ref([])
const totalRows = ref(0)

// local data list pagination
function fetchData (data) {
  const { search, pageNumber, pageSize } = data
  const start = (pageNumber - 1) * pageSize
  const end = start + pageSize - 1

  const list = search ? list1.filter(val => val.name.includes(search)) : list1
  totalRows.value = list.length
  data1.value = list.filter((val, index) => index >= start && index <= end)
}
function selectionChange (data) {
  console.log(data)
}

function labelFormatter (row) {
  return `${row.name} (id: ${row.id})`
}
</script>

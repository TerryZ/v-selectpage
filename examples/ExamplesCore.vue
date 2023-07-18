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
            @search="search"
            @selection-change="selectionChange"
            @page-change="pageChange"
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
            v-model="selected"
            @search="search"
            @selection-change="selectionChange"
            @page-change="pageChange"
          />
        </div>
        <div>
          选择的项目 key: <span v-text="selected.toString()" />
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
const query = ref('')
const totalRows = ref(0)
const pageNumber = ref(1)
const pageSize = ref(10)

// local data list pagination
function fetchData () {
  const start = (pageNumber.value - 1) * pageSize.value
  const end = start + pageSize.value - 1

  const list = query.value ? list1.filter(val => val.name.includes(query.value)) : list1
  totalRows.value = list.length
  data1.value = list.filter((val, index) => index >= start && index <= end)
}
function search (keyword) {
  query.value = keyword
  fetchData()
}
function selectionChange (data) {
  console.log(data)
}
function pageChange (data) {
  pageNumber.value = data.pageNumber
  pageSize.value = data.pageSize
  fetchData()
}

function labelFormatter (row) {
  return `${row.name} (id: ${row.id})`
}
</script>

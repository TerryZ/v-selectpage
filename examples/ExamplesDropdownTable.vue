<template>
  <div class="p-3">
    <h4>Table View 表格视图</h4>

    <h5>单选模式</h5>
    <div class="mb-3">
      <SelectPageTable
        :data="data1"
        :total-rows="totalRows"
        :columns="columns"
        :loading="loading"
        language="zh-chs"
        class=""
        v-model="selected"
        @selection-change="selectionChange"
        @fetch-data="fetchData"
        @fetch-selected-data="fetchSelectedData"
        @remove="remove"
      />
    </div>

    <h5>多选模式</h5>
    <div class="mb-3">
      <SelectPageTable
        :data="data1"
        :total-rows="totalRows"
        :columns="columns"
        :loading="loading"
        multiple
        language="zh-chs"
        class=""
        v-model="selected1"
        @selection-change="selectionChange"
        @fetch-data="fetchData"
        @fetch-selected-data="fetchSelectedData"
        @remove="remove"
      />
    </div>

    <h5>禁用状态</h5>
    <div class="row">
      <div class="col-md-6">
        <SelectPageTable
          :data="data1"
          :total-rows="totalRows"
          :columns="columns"
          :loading="loading"
          :disabled="true"
          language="zh-chs"
          class=""
          v-model="selected"
          @selection-change="selectionChange"
          @fetch-data="fetchData"
          @fetch-selected-data="fetchSelectedData"
          @remove="remove"
        />
      </div>
      <div class="col-md-6">
        <SelectPageTable
          :data="data1"
          :total-rows="totalRows"
          :columns="columns"
          :loading="loading"
          :disabled="true"
          multiple
          language="zh-chs"
          class=""
          v-model="selected1"
          @selection-change="selectionChange"
          @fetch-data="fetchData"
          @fetch-selected-data="fetchSelectedData"
          @remove="remove"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

import { SelectPageTable } from '@/'
import { list1 } from './example-data'

const data1 = ref([])
const selected = ref([23])
const selected1 = ref([3, 5, 7])
const totalRows = ref(0)
const loading = ref(false)
const columns = ref([
  { title: '名称', data: 'name' },
  { title: '编码', data: 'code' },
  { title: '单价', data: 'price' }
])

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
  console.log('selection-change', data)
}
function remove (data) {
  console.log('remove', data)
}
</script>

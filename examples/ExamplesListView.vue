<template>
  <div class="p-3">
    <h1>List View 列表视图</h1>

    <h4>单选模式</h4>
    <div class="mb-3">
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
        @remove="remove"
      />
    </div>

    <h4>多选模式</h4>
    <div class="mb-3">
      <SelectPageList
        :data="data1"
        :total-rows="totalRows"
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

    <h4>禁用状态</h4>
    <div class="row">
      <div class="col-md-6">
        <SelectPageList
          :data="data1"
          :total-rows="totalRows"
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
        <SelectPageList
          :data="data1"
          :total-rows="totalRows"
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

import { SelectPageList } from '@/'
import { list1 } from './data'

const data1 = ref([])
const selected = ref([23])
const selected1 = ref([3, 5, 7])
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
  console.log('selection-change', data)
}
function remove (data) {
  console.log('remove', data)
}
</script>
./example-data

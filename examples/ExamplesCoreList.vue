<template>
  <div class="p-3">
    <h4>List View 列表视图</h4>
    <div class="row mb-5">
      <div class="col-md-6">
        <h5>单选模式</h5>
        <div class="mb-3">
          选择的项目 key:
          <span
            class="bg-light py-1 px-2 rounded-3 ms-2"
            v-text="selected.toString() || '无'"
          />
        </div>
        <div class="mb-3">
          <SelectPageListCore
            :total-rows="totalRows"
            language="zh-chs"
            class="shadow"
            v-model="selected"
            @selection-change="selectionChange"
            @fetch-data="fetchData"
            @fetch-selected-data="fetchSelectedData"
            @remove="remove"
          />
        </div>
        <div>
          <button
            type="button"
            class="btn btn-outline-secondary me-3"
            @click="updateSelected([3])"
          >
            set model to [3]
          </button>

          <button
            type="button"
            class="btn btn-outline-secondary"
            @click="updateSelected([2, 3, 4])"
          >
            set model to [2, 3, 4]
          </button>
        </div>
      </div>
      <div class="col-md-6">
        <h5>多选模式</h5>
        <div class="mb-3">
          选择的项目 key: <span
            class="bg-light py-1 px-2 rounded-3 ms-2"
            v-text="selected1.toString() || '无'"
          />
        </div>
        <div class="mb-3">
          <SelectPageListCore
            :total-rows="totalRows"
            :label-prop="labelFormatter"
            :multiple="true"
            :max="2"
            class="shadow"
            v-model="selected1"
            @selection-change="selectionChange"
            @fetch-data="fetchData"
            @fetch-selected-data="fetchSelectedData"
            @remove="remove"
          />
        </div>
        <div>
          <button
            type="button"
            class="btn btn-outline-secondary me-3"
            @click="updateSelected1([2, 3, 124])"
          >
            set model to [2, 3, 124]
          </button>
          <button
            type="button"
            class="btn btn-outline-secondary"
            @click="updateSelected1([1, 1, 1, 2, 3])"
          >
            set model to [1, 1, 1, 2, 3]
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

import { list1 } from './example-data'

import { SelectPageListCore } from '@/'

const selected = ref([23])
const selected1 = ref([])
const totalRows = ref(0)

// local data list pagination
function fetchData (data, callback) {
  const { search, pageNumber, pageSize } = data
  const start = (pageNumber - 1) * pageSize
  const end = start + pageSize - 1

  const list = search ? list1.filter(val => val.name.includes(search)) : list1
  // update total rows
  totalRows.value = list.length

  setTimeout(() => {
    callback(
      list.filter((val, index) => index >= start && index <= end)
    )
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
function remove (data) {
  console.log(data)
}
function labelFormatter (row) {
  return `${row.name} (id: ${row.id})`
}
function updateSelected (data) {
  selected.value = data
}
function updateSelected1 (data) {
  selected1.value = data
}
</script>
./example-data

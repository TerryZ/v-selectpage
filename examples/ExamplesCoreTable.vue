<template>
  <div class="p-3">
    <h4>Table View 表格视图</h4>
    <div class="row">
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
          <SelectPageTableCore
            :total-rows="totalRows"
            :columns="columns"
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
        <div>
          <SelectPageTableCore
            :total-rows="totalRows"
            :label-prop="labelFormatter"
            :columns="columns"
            :multiple="true"
            :max="2"
            class="shadow"
            width="400px"
            v-model="selected1"
            @selection-change="selectionChange"
            @fetch-data="fetchData"
            @remove="remove"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

import { useSelectPageHandle } from './handles'

import { SelectPageTableCore } from '@/'

const {
  totalRows,
  fetchData,
  fetchSelectedData,
  selectionChange,
  labelFormatter,
  remove
} = useSelectPageHandle()

const selected = ref([23])
const selected1 = ref([])
const columns = ref([
  { title: '编码', data: 'code', width: 100 },
  { title: '名称', data: 'name' },
  { title: '单价', data: 'price', width: 80 }
])

function updateSelected (data) {
  selected.value = data
}
</script>

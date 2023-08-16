<template>
  <div class="p-3">
    <h4>Table View 表格视图</h4>

    <h5>单选模式</h5>
    <div class="mb-3">
      <SelectPageTable
        :total-rows="totalRows"
        :columns="columns"
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
        :total-rows="totalRows"
        :columns="columns"
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
          :total-rows="totalRows"
          :columns="columns"
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
          :total-rows="totalRows"
          :columns="columns"
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

import { useSelectPageHandle } from './handles'

import { SelectPageTable } from '@/'

const {
  totalRows,
  fetchData,
  fetchSelectedData,
  selectionChange,
  remove
} = useSelectPageHandle()

const selected = ref([23])
const selected1 = ref([3, 5, 7])
const columns = ref([
  { title: '名称', data: 'name' },
  { title: '编码', data: 'code' },
  { title: '单价', data: 'price' }
])
</script>

<template>
  <div class="p-3">
    <h4>List View 列表视图</h4>

    <h5>单选模式</h5>
    <div class="mb-3">
      <SelectPageList
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
      <SelectPageList
        multiple
        language="zh-chs"
        class=""
        width="500px"
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
        <SelectPageList
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

import { SelectPageList } from '@/'

const {
  fetchData,
  fetchSelectedData,
  selectionChange,
  remove
} = useSelectPageHandle()

const selected = ref([23])
const selected1 = ref([3, 5, 7])
</script>

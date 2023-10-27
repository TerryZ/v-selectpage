<template>
  <div class="p-3">
    <h4>List View 列表视图</h4>

    <h5>单选模式</h5>
    <div class="mb-3">
      <SelectPageList
        language="zh-chs"
        class=""
        ref="spl"
        v-model="selected"
        custom-trigger-class="border border-3 rounded-3"
        custom-container-class="border border-3 rounded-3"
        @selection-change="selectionChange"
        @fetch-data="fetchData"
        @fetch-selected-data="fetchSelectedData"
        @remove="remove"
      />
    </div>
    <div class="mb-3">
      <button
        type="button"
        class="btn btn-outline-secondary me-3"
        @click="updateSelected([3])"
      >
        set model to [3]
      </button>
      <button
        type="button"
        class="btn btn-outline-secondary me-3"
        @click="updateSelected([2, 3, 4])"
      >
        set model to [2, 3, 4]
      </button>
      <button
        type="button"
        class="btn btn-outline-secondary me-3"
        @click="updateSelected([])"
      >
        set model to []
      </button>
      <button
        type="button"
        class="btn btn-outline-secondary"
        @click="removeAll"
      >
        remove all(api)
      </button>
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
    <div class="row mb-3">
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

    <h5>Demo</h5>
    <div class="row">
      <div class="col-md-6">
        <SelectPageList
          @fetch-data="fetchDemoData"
          @fetch-selected-data="fetchDemoSelectedData"
        />
      </div>
      <div class="col-md-6">
        <SelectPageList
          multiple
          @fetch-data="fetchDemoData"
          @fetch-selected-data="fetchDemoSelectedData"
        />
      </div>
    </div>
    <div style="height: 500px;" />
  </div>
</template>

<script setup>
import { ref } from 'vue'

import { useSelectPageHandle } from './handles'
import { nbaTeams } from './example-data'

import { SelectPageList } from '@/'

const {
  fetchData,
  fetchSelectedData,
  selectionChange,
  remove
} = useSelectPageHandle()
const {
  fetchData: fetchDemoData,
  fetchSelectedData: fetchDemoSelectedData
} = useSelectPageHandle(nbaTeams)

const selected = ref([23])
const selected1 = ref([3, 5, 7])

const spl = ref()

function updateSelected (data) {
  selected.value = data
}
function removeAll () {
  spl.value.removeAll()
}
</script>

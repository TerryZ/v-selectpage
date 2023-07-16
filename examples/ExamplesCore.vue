<template>
  <div class="p-3">
    <h3>核心模块</h3>

    <h5>List View 列表视图</h5>
    <div>
      <div class="shadow-sm rounded-3 border overflow-hidden">
        <SelectPageListCore
          :data="list1"
          :total-rows="101"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
// import { ref } from 'vue'
import { SelectPageListCore } from '@/'

import { list1 } from './data'

</script>

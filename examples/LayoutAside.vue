<template>
  <div class="px-3 pt-3 border-end">
    <div
      class="text-secondary text-opacity-50 px-3 py-2 fw-bold"
      style="cursor: pointer;"
      :class="itemClasses(item)"
      :key="item.name"
      v-for="item in forms"
      v-text="item.name"
      @click="switchForm(item, router)"
    />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

import { forms, form, switchForm } from './store'

const router = useRouter()

function itemClasses (item) {
  if (item.code !== form.value) return ''
  return 'text-black text-opacity-100 bg-body-secondary bg-opacity-50 rounded-4'
}
</script>

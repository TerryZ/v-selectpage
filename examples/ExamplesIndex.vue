<template>
  <div class="d-grid app-container vh-100">
    <LayoutHeader class="app-header" />
    <LayoutAside class="app-aside" />
    <div class="app-main overflow-auto">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'

import { detectActive } from './store'

import LayoutHeader from './LayoutHeader.vue'
import LayoutAside from './LayoutAside.vue'

const route = useRoute()

onMounted(() => {
  detectActive(route)
})
</script>

<style lang="sass">
.app-container
  grid-template-columns: 300px auto
  grid-template-rows: 60px auto
  grid-template-areas: "header header" "aside main"
  .app-header
    grid-area: header
  .app-aside
    grid-area: aside
  .app-main
    grid-area: main
</style>

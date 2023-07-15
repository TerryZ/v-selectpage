<template>
  <div
    class="d-grid vh-100"
    style="grid-template-columns: 300px auto;"
  >
    <div class="bg-light px-3">
      <div class="fs-4 p-3 fw-bold">
        SelectPage
      </div>
      <div>
        <div
          class="text-secondary text-opacity-50 p-3 "
          :class="itemClasses(item)"
          style="cursor: pointer;"
          v-for="item in items"
          :key="item.name"
          v-text="item.name"
          @click="forward(item)"
        />
      </div>
    </div>

    <div>
      <router-view />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const items = [
  { name: 'Core', path: '/core' },
  { name: 'ListView', path: '/list' },
  { name: 'TableView', path: '/table' }
]

const active = ref('Core')
const route = useRoute()
const router = useRouter()

function itemClasses (item) {
  if (item.name !== active.value) return ''
  return 'text-body fw-bold text-opacity-100 bg-body-secondary rounded-3'
}
function forward (item) {
  active.value = item.name
  router.push({ path: item.path }).catch(() => {})
}

onMounted(() => {
  const item = items.find(val => val.path === route.path)

  if (item) {
    active.value = item.name
  }
})
</script>

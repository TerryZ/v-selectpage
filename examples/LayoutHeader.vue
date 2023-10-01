<template>
  <nav class="navbar navbar-expand-lg bg-light">
    <div class="container-fluid">
      <a
        class="navbar-brand fs-4 fw-bold ps-3"
        href="#"
      >SelectPage</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon" />
      </button>
      <div
        class="collapse navbar-collapse"
        style="margin-left: 8.5rem;"
        id="navbarNav"
      >
        <ul class="navbar-nav">
          <li
            class="nav-item px-3 fw-bold"
            v-for="item in types"
            :key="item.code"
            @click="switchType(item, router)"
          >
            <a
              class="nav-link"
              :class="itemClasses(item)"
              v-bind="itemAttributes(item)"
              v-text="item.name"
            />
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { types, type, switchType } from './store'

const router = useRouter()

function itemAttributes (item) {
  const attrs = { href: 'javascript:void(0)' }

  if (item.code === type.value) {
    attrs['aria-current'] = 'page'
  }

  return attrs
}
function itemClasses (item) {
  if (item.code === type.value) {
    return 'active text-black'
  }
  return 'text-secondary text-opacity-50'
}
</script>

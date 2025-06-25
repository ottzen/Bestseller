<template>
  <div>
    <h3 class="text-lg font-bold text-gray-900 mb-2">
      {{ category.name[locale] }}
    </h3>
    <ul class="space-y-1">
      <li
        v-for="child in category.categories || []"
        :key="child.id"
        class="text-sm text-gray-700 hover:text-blue-500"
      >
        <div v-if="child.categories">
          <div class="font-semibold">{{ child.name[locale] }}</div>
          <ul class="ml-4 mt-1 space-y-1">
            <li
              v-for="sub in child.categories"
              :key="sub.id"
              class="text-gray-600 hover:text-blue-400"
            >
              {{ sub.name[locale] }}
            </li>
          </ul>
        </div>
        <div v-else>
          {{ child.name[locale] }}
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { Category } from '../interfaces/categories.interface';

defineProps<{
  category: {
    id: string
    name: { en: string; dk: string }
    categories?: Category[]
  }
  locale: 'en' | 'dk'
}>()
</script>

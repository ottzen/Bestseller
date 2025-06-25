<template>
  <div>
    <!-- Level 2 category as headline -->
    <h3 v-if="category.level === 2" class="text-lg font-bold text-gray-900 mb-3 border-b border-gray-200 pb-2">
      <NuxtLink :to="`/products?category=${category.id}`" class="hover:text-green-900">
        {{ category.name[locale] }}
      </NuxtLink>
    </h3>

    <!-- Non-level 2 categories -->
    <div v-else-if="category.categories?.[0]?.level === 2" class="text-sm text-gray-600 ">
      <NuxtLink :to="`/products?category=${category.id}`" class="hover:text-green-900">
        {{ category.name[locale] }}
      </NuxtLink>
    </div>

    <ul v-if="category.categories && category.categories.length" class="space-y-1 ml-2">
      <li v-for="sub in category.categories" :key="sub.id" class="text-sm text-gray-600 ">
        <NuxtLink :to="`/products?category=${sub.id}`" class="block py-1 hover:text-green-900 hover:font-semibold">
          {{ sub.name[locale] }}
        </NuxtLink>
        <CategoryTree v-if="sub.categories && sub.categories.length" :category="sub" :locale="locale" />
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
    level: number
    categories?: Category[]
  }
  locale: 'en' | 'dk'
}>()
</script>

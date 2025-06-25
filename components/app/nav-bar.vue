<template>
  <nav class="relative z-50">
    <div class="max-w-7xl mx-auto px-4">
      <ul class="flex space-x-6 items-center">
        <li class="relative">
          <NuxtLink :to="`/`" class="py-4 px-4 text-gray-800 font-semibold hover:text-green-900">
            Forside
          </NuxtLink>
        </li>
        <li class="relative">
          <NuxtLink :to="`/products`" class="py-4 px-4 text-gray-800 font-semibold hover:text-green-900">
            Alle produkter
          </NuxtLink>
        </li>

        <!-- Brands dropdown -->
        <li class="relative" @mouseenter="showBrandsMenu" @mouseleave="hideMenuWithDelay">
          <NuxtLink :to="`/products`" class="block py-4 px-4 text-gray-800 font-semibold hover:text-green-900">
            Brands
          </NuxtLink>

          <!-- Brands dropdown menu -->
          <div 
            v-if="showBrands" class="absolute left-0 top-full bg-white shadow-lg mt-1 z-50 min-w-[200px]"
            @mouseenter="cancelHide" @mouseleave="hideMenuWithDelay">
            <div class="p-4">
              <ul class="space-y-2">
                <li>
                  <NuxtLink :to="`/products`" class="block py-1 text-gray-700 hover:text-green-900 hover:font-semibold">
                    Alle brands
                  </NuxtLink>
                </li>
                <li 
                  v-for="brand in brands" :key="brand">
                  <NuxtLink 
                    :to="`/products?brand=${encodeURIComponent(brand)}`"
                    class="block py-1 text-gray-700 hover:text-green-900 hover:font-semibold">
                    {{ brand }}
                  </NuxtLink>
                </li>
              </ul>
            </div>
          </div>
        </li>

        <li 
          v-for="topLevel in categories" :key="topLevel.id" class="relative" @mouseenter="showMenu(topLevel.id)"
          @mouseleave="hideMenuWithDelay">
          <NuxtLink 
            :to="`/products?category=${topLevel.id}`"
            class="block py-4 px-4 text-gray-800 font-semibold hover:text-green-900">
            {{ topLevel.name[locale] }}
          </NuxtLink>
          <!-- Dropdown menu -->
          <div 
            v-if="hoveredId === topLevel.id && topLevel.categories && topLevel.categories.length"
            class="absolute left-0 top-full bg-white shadow-lg mt-1 z-50 min-w-[300px]" @mouseenter="cancelHide"
            @mouseleave="hideMenuWithDelay">
            <div class="p-6 grid grid-cols-2 gap-6">
              <app-categoryTree 
                v-for="child in topLevel.categories" :key="child.id" :category="child"
                :locale="locale" />
            </div>
          </div>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useFetch } from 'nuxt/app'

defineProps<{
  categories: Category[]
}>()

const locale = 'dk'

interface Category {
  id: string
  name: { en: string; dk: string }
  parent_category_id: string
  level: number
  categories?: Category[]
}

// Load brands data
const { data: brandsData } = await useFetch<string[]>('/api/brands')
const brands = computed(() => brandsData.value || [])

const hoveredId = ref<string | null>(null)
const showBrands = ref(false)
let hideTimeout: NodeJS.Timeout

function showMenu(id: string) {
  clearTimeout(hideTimeout)
  hoveredId.value = id
  showBrands.value = false
}

function showBrandsMenu() {
  clearTimeout(hideTimeout)
  hoveredId.value = null
  showBrands.value = true
}

function hideMenuWithDelay() {
  hideTimeout = setTimeout(() => {
    hoveredId.value = null
    showBrands.value = false
  }, 200)
}

function cancelHide() {
  clearTimeout(hideTimeout)
}
</script>

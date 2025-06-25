<template>  <main class="container mx-auto pt-40 pb-20">

    <!-- Sidebar and product list -->
    <div class="flex gap-10">
      <!-- Sidebar  -->
      <aside class="w-64 space-y-6 hidden sm:block">
        <!-- Brands -->
        <div class="p-4 bg-white border border-gray-300 rounded-lg">
          <app-brandSideBar :brands="availableBrands" :selected="selectedBrand" @select="setSelectedBrand"/>
        </div>
        
        <!-- Categories -->
        <div class="p-4 bg-white border border-gray-300 rounded-lg">
          <app-categorySideBar :categories="categoryData?.categories || []" :selected="selectedCategory" @select="setSelectedCategory"/>
        </div>
      </aside>

      <!-- Product List -->
      <section class="flex-1 p-2">
        <div class="flex items-center justify-between mb-4">
          <h1 class="text-2xl">Produkter</h1>
          <app-productCount :count="filteredCount" />
        </div>
        <app-productList :filtered-products="filteredProducts" />
      </section>
    </div>
  </main>
</template>


<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useFetch, useRoute, useRouter } from 'nuxt/app'
import appCategorySideBar from '~/components/app/categorySideBar.vue'
import appBrandSideBar from '~/components/app/brandSideBar.vue'
import type { Product } from '~/components/interfaces/product.interface'
import type { Category } from '~/components/interfaces/categories.interface'

// 1. Load categories and products
const { data: categoryData } = await useFetch<Category>('/api/categories')
const { data: products } = await useFetch<Product[]>('/api/products')

// 2. State for selected category and brand
const route = useRoute()
const router = useRouter()

// Initialize from URL query parameters
const selectedCategory = ref<string | null>(route.query.category as string || null)
const selectedBrand = ref<string | null>(route.query.brand as string || null)

// 3. Get available brands from products
const availableBrands = computed(() => {
  if (!products.value) return []
  const brands = new Set(products.value.map(p => p.brand))
  return Array.from(brands).sort()
})

function setSelectedCategory(id: string | null) {
  selectedCategory.value = id
  updateURL()
}

function setSelectedBrand(brand: string | null) {
  selectedBrand.value = brand
  updateURL()
}

function updateURL() {
  const query: Record<string, string> = {}
  if (selectedCategory.value) query.category = selectedCategory.value
  if (selectedBrand.value) query.brand = selectedBrand.value
  router.push({ query })
}

// Watch for URL changes for updating selected filters
watch(() => route.query.category, (newCategory) => {
  selectedCategory.value = newCategory as string || null
})

watch(() => route.query.brand, (newBrand) => {
  selectedBrand.value = newBrand as string || null
})

// 4. Filter products by selected category and brand
const filteredProducts = computed(() => {
  if (!products.value) return []
  
  let filtered = products.value
  
  // Filter by category
  if (selectedCategory.value) {
    filtered = filtered.filter(p =>
      p.categories.includes(selectedCategory.value as string)
    )
  }
  
  // Filter by brand
  if (selectedBrand.value) {
    filtered = filtered.filter(p => p.brand === selectedBrand.value)
  }
  
  return filtered
})

const filteredCount = computed(() => filteredProducts?.value.length)
</script>

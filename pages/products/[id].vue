<template>
  <main class="max-w-5xl mx-auto px-4 py-10 pt-30">
    <div class="mb-6">
      <button
        class="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
        @click="goBack"
      >
        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
        Tilbage til produktliste
      </button>
    </div>
    
    <div v-if="!product" class="text-center text-gray-500">Ingen produktdata.</div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-10">
      <div>
        <NuxtImg
          :src="product.images[0]"
          alt="Product image"
          class="w-full h-auto rounded-lg shadow"
        />
        <div class="flex gap-2 mt-4 overflow-x-auto">
          <NuxtImg
            v-for="(img, i) in product.images"
            :key="i"
            :src="img"
            class="w-20 h-20 object-cover rounded border" 
          />
        </div>
      </div>

      <div>
        <h1 class="text-2xl font-bold mb-2">{{ product.name.dk }}</h1>
        <p class="text-gray-500 text-sm mb-4">
          Brand: <NuxtLink class="underline" :to="`/products?brand=${encodeURIComponent(product.brand)}`">{{ product.brand }}</NuxtLink>
        </p>
        <p class="text-lg font-semibold mb-2">Kr.{{ product.price }},-</p>
        <p class="mb-4">Lager: {{ product.stock === 0 ? 'Ikke på lager' : product.stock }}</p>

        <div class="mb-4">
          <p class="font-semibold">Farve:</p>
          <p>{{ product.color }}</p>
        </div>

        <div class="mb-4">
          <p class="font-semibold">Tilgængelige størrelser:</p>
          <div class="flex gap-2 flex-wrap">
            <span
              v-for="size in product.size"
              :key="size"
              class="px-3 py-1 border rounded text-sm"
            >
              {{ size }}
            </span>
          </div>
        </div>

        <div v-if="product.variant?.length" class="mt-6">
          <p class="font-semibold mb-2">Varianter:</p>
          <div
            v-for="(variant, index) in product.variant"
            :key="index"
            class="border p-3 rounded mb-2"
          >
            <p>Farve: {{ variant.color }}</p>
            <p>Lager: {{ variant.stock === 0 ? 'Ikke på lager' : variant.stock }}</p>
            <p>Størrelse: {{ variant.size.join(', ') }}</p>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import type { Product } from '~/components/interfaces/product.interface'
import { ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const productId = Number(route.params.id)

const { data: products } = await useFetch<Product[]>('/api/products', {
  key: 'products',
  server: true,
  lazy: false,
}) 

const product = ref<Product | null>(null)

watchEffect(() => {
  if (products.value && products.value?.length) {
    product.value = products.value.find(p => p.id === productId) ?? null
  }
})

const goBack = () => {
  window.history.back()
}
</script>

<template>
  <div class="flex flex-col h-full justify-between">
    <NuxtImg 
      v-if="item.images?.length > 0" :src="item.images?.[0]" :alt="item.name.dk || item.name.en" fill
      class="object-contain" 
    />

    <div class="dark:text-gray-600 flex flex-col flex-1">

      <h2 class="text-base font-semibold mb-2">
        {{ item.name.dk || item.name.en }}
      </h2>

      <div class="mt-auto flex justify-between items-center pt-4">
        <button 
          class="bg-green-900 text-xs text-white px-4 py-2 rounded hover:bg-gray-800 transition"
          @click="goToProductDetails(item.id)">
          Se produkt
        </button>
        <p class="font-semibold">Kr. {{ item.price }},-</p>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import type { Product } from '../interfaces/product.interface';
const router = useRouter()

defineProps<{
  item: Product
}>()

function goToProductDetails(productId: number) {
  router.push(`/products/${productId}`)
}
</script>
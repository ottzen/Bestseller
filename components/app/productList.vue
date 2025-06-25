<template>
  <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
    <div v-if="mergedItems.length === 0" class="col-span-full text-center text-gray-500">
      <p>Ingen produkter i denne kategori.</p>
    </div>
    <li 
      v-for="item in mergedItems"
      :key="item.type === 'product' ? `product-${(item.data as Product).id}` : `promo-${(item.data as PromotionalSpot).position}`"
      :class="[
        'p-5 list-none border border-white/20 bg-white rounded-lg overflow-hidden flex flex-col transition-transform duration-500 ease-in-out relative hover:-translate-y-0.5',
        item.type === 'promotion' && (item.data as PromotionalSpot).type === '2x1' ? 'sm:col-span-2 lg:col-span-2' : ''
      ]">

      <app-productCard v-if="item.type === 'product'" :item="(item.data as Product)" :products="filteredProducts" />
      <app-promotionalSpotCard v-else-if="item.type === 'promotion'" :spot="(item.data as PromotionalSpot)" />

    </li>
  </ul>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useFetch } from 'nuxt/app'
import type { Product } from '../interfaces/product.interface'
import type { PromotionalSpot } from '../interfaces/promotionalSpot.interface'

const props = defineProps<{
  filteredProducts: Product[]
}>()

// Load promotional spots
const { data: promotionalSpots } = await useFetch<PromotionalSpot[]>('/api/promotionalspots')

// Create merged items with products and promotional spots
const mergedItems = computed(() => {
  const items: Array<{
    type: 'product' | 'promotion'
    data: Product | PromotionalSpot
    position: number
  }> = []

  // Add all products with  positions
  props.filteredProducts.forEach((product, index) => {
    items.push({
      type: 'product',
      data: product,
      position: index + 1
    })
  })

  // Add promotional spots at their specified positions
  if (promotionalSpots.value) {
    promotionalSpots.value.forEach(spot => {
      if (spot.position <= props.filteredProducts.length + promotionalSpots.value!.length) {
        items.push({
          type: 'promotion',
          data: spot,
          position: spot.position
        })
      }
    })
  }

  // Sort all items by position
  items.sort((a, b) => a.position - b.position)

  // Adjust positions to account for inserted promotional spots
  const finalItems: Array<{
    type: 'product' | 'promotion'
    data: Product | PromotionalSpot
  }> = []

  let productIndex = 0
  let position = 1

  while (productIndex < props.filteredProducts.length || position <= Math.max(...(promotionalSpots.value?.map(s => s.position) || [0]))) {
    // Check if there's a promotional spot at this position
    const promoAtPosition = promotionalSpots.value?.find(spot => spot.position === position)

    if (promoAtPosition) {
      finalItems.push({
        type: 'promotion',
        data: promoAtPosition
      })
    } else if (productIndex < props.filteredProducts.length) {
      finalItems.push({
        type: 'product',
        data: props.filteredProducts[productIndex]
      })
      productIndex++
    }

    position++
  }

  return finalItems
})
</script>
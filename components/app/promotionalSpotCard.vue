<template>
  <div class="flex flex-col h-full">
    <NuxtLink :to="spot.link" class="block flex-1 relative overflow-hidden rounded-lg">
      <NuxtImg
        :src="spot.image.imageUrl"
        :alt="spot.image.alt || spot.imageAltText || 'Promotional content'"
        fill
        :class="[
          'object-cover transition-transform duration-300 hover:scale-105',
          spot.type === '2x1' ? 'object-center' : 'object-cover'
        ]"
      />
    </NuxtLink>

    <div v-if="spot.imageAltText" class="mt-2 text-center">
      <p class="text-sm text-gray-600">{{ spot.imageAltText }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PromotionalSpot } from '../interfaces/promotionalSpot.interface'

defineProps<{
  spot: PromotionalSpot
}>()
</script>

<template>
  <ul class="space-y-1">
    <!-- Only show if root -->
    <li v-if="isRoot">
      <button
        class="text-left w-full py-1 hover:cursor-pointer  hover:text-green-900 hover:font-semibold"
        :class="[
          selected === null ? 'font-bold text-green-900 active' : 'text-gray-800'
        ]"
        @click="emit('select', null)"
      >
        Alle produkter
      </button>
    </li>

    <li v-for="category in categories" :key="category.id">
      <button
        :class="[
          'text-left w-full py-1 hover:cursor-pointer hover:text-green-900 hover:font-semibold',
          getPaddingClass(category.level),
          selected === category.id ? 'font-semibold text-green-900 active' : 'text-gray-800'
        ]"
        @click="emit('select', category.id)"
      >
        {{ category.name.dk }}
      </button>

      <!-- Re-use of current component -->
      <app-categorySideBar
        v-if="category.categories && category.categories.length"
        :categories="category.categories"
        :selected="selected"
        :is-root="false"
        @select="emit('select', $event)"
      />
    </li>
  </ul>
</template>


<script setup lang="ts">
import type { Category } from '~/components/interfaces/categories.interface'

const { isRoot = true } = defineProps<{
  categories: Category[]
  selected: string | null
  isRoot?: boolean
}>()

const emit = defineEmits<{
  (e: 'select', id: string | null): void
}>()

const getPaddingClass = (level: number) => {
    const map = {
        0: 'pl-0',
        1: 'pl-2',
        2: 'pl-4',
        3: 'pl-6',
        4: 'pl-8',
        5: 'pl-10',
        6: 'pl-12',
    }
    return map[level as keyof typeof map] || 'pl-0'
}
</script>

<style scoped>
.catLink {
  position: relative;
  display: inline-block;
  text-decoration: none;
  color: inherit;
  transition: color 0.3s ease;
}

.catLink::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 0%;
  height: 2px;
  background-color: currentColor;
  transition: width 0.3s ease;
}

.catLink:hover::after,
.catLink.active::after {
  width: 100%;
}
</style>

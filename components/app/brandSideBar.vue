<template>
    <div>
        <h3 class="text-base font-semibold text-gray-900 mb-3">Brands</h3>
        <div class="flex flex-wrap gap-1.5">

            <button 
                v-if="isRoot" class="px-3 py-1.5 rounded-full border text-xs font-medium transition-colors" :class="[
                selected === null
                    ? 'bg-green-900 text-white '
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-green-900 hover:text-white'
            ]" @click="emit('select', null)">
                Alle brands
            </button>

            <button 
                v-for="brand in brands" :key="brand"
                class="px-3 py-1.5 rounded-full border text-xs font-medium transition-colors" :class="[
                    selected === brand
                        ? 'bg-green-900 text-white '
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-green-900 hover:text-white'
                ]" @click="emit('select', brand)">
                {{ brand }}
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
const { isRoot = true } = defineProps<{
    brands: string[]
    selected: string | null
    isRoot?: boolean
}>()

const emit = defineEmits<{
    (e: 'select', brand: string | null): void
}>()
</script>

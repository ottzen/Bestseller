<template>
    <div className="text-sm font-bold text-gray-600 whitespace-nowrap mt-2 sm:mt-0">
        Viser {{count}} produkter
    </div>
</template>

<script setup lang="ts">
defineProps<{
    count: number
}>()
</script>
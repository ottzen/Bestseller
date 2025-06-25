<template>
    <header class="flex items-center justify-between p-5 fixed top-0 left-0 right-0 z-20 transition-all duration-200 rounded-[15px] bg-white/20 backdrop-blur border border-white/10">
      <div>
        <Link href="/">
          <Image src="/website-logo.jpg" alt="Logo" width={100} height={40} />
        </Link>
        <app-nav-bar :categories="categoryData?.categories || []" />
      </div>
      <div class='flex flex-row gap-4'>
        <figure>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            width="24"
            height="24"
            class="hover:scale-120 transition-transform duration-200"
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </figure>
        <figure>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            width="24"
            height="24"
            class="hover:scale-120 transition-transform duration-200"
          >
            <path d="M6 6h15l-1.5 9h-13z" />
            <circle cx="9" cy="20" r="1" />
            <circle cx="18" cy="20" r="1" />
            <path d="M6 6l-2 0" />
          </svg>
        </figure>
      </div>
    </header>
</template>

<script setup lang="ts">
import type { Category } from '../interfaces/categories.interface';
const { data: categoryData } = await useFetch<Category>('/api/categories')
</script>
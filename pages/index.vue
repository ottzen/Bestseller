<template>
    <main class="grid items-center justify-items-center min-h-screen p-8 gap-16">
      <div class="flex flex-col gap-10 row-start-2 items-center">        
        <div class="flex flex-col sm:flex-row w-full max-w-4xl h-auto sm:h-[400px] shadow-2xl">  
          <div class="w-full sm:w-1/2 h-64 sm:h-full bg-white flex items-center">
            <NuxtImg
              src="images/profil1.jpg"
              alt="Profil"
              width={800}
              height={800}
              class="object-cover w-full h-full"
            />
          </div>
          
          <div class="w-full sm:w-1/2 h-auto sm:h-full bg-white sm:rounded-tr-[50px] p-10 flex flex-col justify-center">
            <h1 class="text-3xl">
              Kasper Søgaard Ottzen
            </h1>
            <h2 class="font-bold">
              Frontend udvikler
            </h2>
            <div class="text-gray-500 mt-5 text-xs flex flex-col gap-2">
              <p>
                Frontend-case til Bestseller, lavet i Nuxt med TypeScript og TailWind.
              </p>
              <p>
                Indeholder forside, produktliste-side for forskellig filtrering samt produktdetalje-side. Så meget som muligt er forsøgt at lave serverside-rendered. 
              </p>
            </div>
          </div>

        </div>
      </div>

      <footer class="row-start-3 flex gap-10 flex-wrap items-center justify-center">
        <div class="flex items-center gap-2">
          <picture>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <path d="M4 4h16v16H4z" />
              <path d="M4 4l8 8 8-8" />
            </svg>
          </picture>
          <NuxtLink class="text-xs" href="mailto:kasper@ottzen.com">kasper@ottzen.com</NuxtLink>
        </div>
      </footer>
    </main>
</template>
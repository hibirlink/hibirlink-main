<template>
  <section class="flex items-center h-full p-16 text-neutral-700 min-h-screen">
    <div
      class="container flex flex-col items-center justify-center px-5 mx-auto my-8"
    >
      <div class="max-w-md text-center">
        <h2 class="mb-8 font-extrabold text-9xl">
          <span class="sr-only">Error</span>404
        </h2>
        <p class="text-2xl font-semibold md:text-3xl">
          Sorry, we couldn't find this page.
        </p>
        <p class="mt-4 mb-8 text-neutral-500">
          But don't worry, you can find plenty of other things on our homepage.
        </p>
        <NuxtLink :to="{name: 'index'}">
          <HButton title="Back To Homepage" type="button" />
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

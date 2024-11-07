<template>
  <main class="w-full h-full max-w-[90rem] mx-auto">
    <h1
      class="text-2xl pl-5 my-3 text-neutral300 font-bold w-full mx-auto text-center"
    >
      Bookmarks
    </h1>
    <div class="flex gap-2 w-full justify-center md:gap-5 items-center mt-2">
      <div
        :class="
          /^\/account\/saved(?!(\/realtime-service))+/i.test(currentPath) &&
          /^\/account\/saved(?!(\/virtual-service))+/i.test(currentPath)
            ? 'text-primary border-primary'
            : 'text-neutral-600 border-neutral-500'
        "
        class="font-semibold transition-colors ease-in-out duration-200 border-2 px-8 py-1 rounded-sm cursor-pointer hover:border-primary hover:text-primary"
      >
        <NuxtLink :to="{ name: 'account-saved' }"> Virtual Products </NuxtLink>
      </div>

      <div
        :class="
          /^\/account\/saved\/realtime-service/i.test(currentPath)
            ? 'text-primary border-primary'
            : 'text-neutral-600 border-neutral-500'
        "
        class="font-semibold transition-colors ease-in-out duration-200 border-2 px-8 py-1 rounded-sm cursor-pointer hover:border-primary hover:text-primary"
      >
        <NuxtLink :to="{ name: 'account-saved-realtime-service' }">
          Physical Services
        </NuxtLink>
      </div>

      <div
        :class="
          /^\/account\/saved\/virtual-service/i.test(currentPath)
            ? 'text-primary border-primary'
            : 'text-neutral-600 border-neutral-500'
        "
        class="font-semibold transition-colors ease-in-out duration-200 border-2 px-8 py-1 rounded-sm cursor-pointer hover:border-primary hover:text-primary"
      >
        <NuxtLink :to="{ name: 'account-saved-virtual-service' }">
          Virtual Services
        </NuxtLink>
      </div>
    </div>

    <NuxtPage />
  </main>
</template>
<script setup lang="ts">
const route = useRoute();

const currentPath = computed(() => route.path);

useHead({
  title: "Saved Services",
});

definePageMeta({
  layout: "custom",
  middleware: "before-entry",
});
</script>

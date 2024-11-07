<template>
  <main
    class="w-full min-h-full flex flex-row justify-between gap-8 max-w-[90rem] mx-auto p-4 relative"
  >
    <section class="bg-light300 lg:max-w-sm min-h-full flex-1">
      <h1 class="font-bold text-neutral300">Orders</h1>
      <h-tab :tabs="tabs">
        <template #pending>
          <section class="grid gap-4 lg:grid-cols-1 sm:grid-cols-2 grid-cols-1">
            <div
              @click="navigate = true"
              v-for="i in 7"
              :key="i"
              class="flex group flex-col items-start justify-center max-w-lg gap-2 bg-light400 bg-opacity-30 p-3 border rounded hover:border-2 hover:border-primary cursor-pointer transition-all ease-in-out duration-200"
            >
              <h1 class="text-primary font-bold text-md">ORDER-1102263</h1>
              <div
                class="flex items-center justify-between w-full text-neutral300"
              >
                <p class="text-xs font-semibold">
                  07 : 00 AM
                  <Icon name="carbon:dot-mark" class="w-3 h-3 text-primary" />
                  19/07/215 E.C
                </p>
                <p class="text-sm font-medium">3 stores</p>
              </div>
            </div>
          </section>
        </template>

        <template #completed>
          <section class="grid gap-4 lg:grid-cols-1 sm:grid-cols-2 grid-cols-1">
            <div
              @click="navigate = true"
              v-for="i in 7"
              :key="i"
              class="flex group flex-col items-start justify-center max-w-lg gap-2 bg-light400 bg-opacity-30 p-3 border rounded hover:border-2 hover:border-lemon cursor-pointer transition-all ease-in-out duration-200"
            >
              <h1 class="text-lemon font-bold text-md">ORDER-1102263</h1>
              <div
                class="flex items-center justify-between w-full text-neutral300"
              >
                <p class="text-xs font-semibold">
                  07 : 00 AM
                  <Icon name="carbon:dot-mark" class="w-3 h-3 text-lemon" />
                  19/07/215 E.C
                </p>
                <p class="text-sm font-medium">3 stores</p>
              </div>
            </div>
          </section>
        </template>

        <template #new>
          <section class="grid gap-4 lg:grid-cols-1 sm:grid-cols-2 grid-cols-1">
            <div
              @click="navigate = true"
              v-for="i in 7"
              :key="i"
              class="flex group flex-col items-start justify-center max-w-lg gap-2 bg-light400 bg-opacity-30 p-3 border rounded hover:border-2 hover:border-darkblue cursor-pointer transition-all ease-in-out duration-200"
            >
              <h1 class="text-darkblue font-bold text-md">ORDER-1102263</h1>
              <div
                class="flex items-center justify-between w-full text-neutral300"
              >
                <p class="text-xs font-semibold">
                  07 : 00 AM
                  <Icon name="carbon:dot-mark" class="w-3 h-3 text-darkblue" />
                  19/07/215 E.C
                </p>
                <p class="text-sm font-medium">3 stores</p>
              </div>
            </div>
          </section>
        </template>
      </h-tab>
    </section>
    <section
      :class="[navigate ? 'lg:w-full top-0' : 'top-full']"
      class="lg:flex-auto flex flex-col gap-1 lg:static fixed top-0 left-0 right-0 bottom-0 bg-light300 transition-all ease-in-out duration-200"
    >
      <div
        class="absolute top-16 left-4 z-40 lg:hidden block cursor-pointer"
        @click="navigate = false"
      >
        <Icon name="bx:arrow-back" class="w-8 h-8 text-dark100" />
      </div>
      <h-geo-location-map :max-zoom="10" :center="{ lat: 42, lng: 52 }" />
      <div
        class="flex lg:items-end gap-6 lg:justify-end lg:static py-2 backdrop-blur-sm absolute bottom-0 left-5 bg-light300 bg-opacity-10 items-center justify-center"
      >
        <div class="text-sm flex flex-col items-end">
          <small>Rides Number</small>
          <p>+251 943 192 345</p>
        </div>
        <button
          type="button"
          class="inline-block text-center rounded-sm bg-primaryvar1 px-8 space-x-4 py-1.5 font-semibold leading-normal text-light300 shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primaryvar1 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
        >
          <Icon name="icon-park-solid:phone-telephone" class="w-5 h-5" />
          Call to Raid
        </button>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
const tabs = [
  {
    text: "pending",

    badge: 3,
  },
  {
    text: "completed",
  },
  {
    text: "new",

    badge: 2,
  },
];

const navigate = ref(false);

useHead({
  title: "Account",
});

definePageMeta({
  layout: "custom",
  middleware: "before-entry",
});
</script>

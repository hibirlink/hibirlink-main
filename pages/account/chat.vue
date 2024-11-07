<template>
  <main
    class="flex justify-center items-start gap-6 max-w-[90rem] min-h-full mx-auto p-5"
  >
    <div class="flex-1 sm:min-w-[28rem] lg:max-w-md max-w-full space-y-2">
      <h-text-field
        name="search"
        placeholder="Search"
        leading-icon="ph:magnifying-glass"
      />
      <div class="space-y-4 h-[calc(100vh-9.3rem)] overflow-auto">
        <NuxtLink
          :to="{ name: 'account-chat-index-id', params: { id: i } }"
          class="flex items-center gap-x-4 cursor-pointer h-fit p-2 rounded w-full"
          v-for="i in 9"
          :key="i"
          :class="[activeChat == i ? 'bg-primaryvar4' : 'hover:bg-primaryvar7']"
        >
          <div class="relative flex-shrink-0">
            <span
              class="absolute bottom-0 right-0 w-4 h-4 bg-lemon border rounded-full text-neutral400 border-light100"
            ></span>
            <img
              src="https://source.unsplash.com/50x50/?portrait"
              alt=""
              class="w-14 h-14 border rounded-full bg-neutral300 border-neutral500"
            />
          </div>

          <div class="h-full flex flex-col">
            <div class="font-bold text-dark100 line-clamp-1">
              Firstname Lastname
            </div>
            <div class="text-neutral200 font-medium line-clamp-1">
              recent or last recived text somed fsdfsf sdfjs sja;ieou
            </div>
          </div>
          <div class="flex flex-col justify-between items-end h-full ml-auto">
            <p class="text-neutral200 font-medium text-md truncate">
              {{ new Date().toString().slice(0, 21) }}
            </p>
            <div
              class="bg-primary w-fit h-fit px-2 rounded-full font-medium text-light400 text-md"
            >
              2
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>
    <div class="flex-auto min-h-full" v-if="activeChat"><NuxtPage /></div>
  </main>
</template>

<script setup lang="ts">
const route: any = useRoute();
const activeChat = computed(() => route?.params?.id ?? null);
useHead({
  title: "Chat",
});

definePageMeta({
  layout: "custom",
  middleware: "before-entry",
});
</script>

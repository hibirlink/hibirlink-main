<template>
  <NuxtLink
    :to="{
      ...(type === Type.REALTIME
        ? { name: 'services-realtime-detail-id', params: { id: id } }
        : { name: 'services-virtual-detail-id', params: { id: id } }),
    }"
    class="hover:shadow-[0px_0px_24px_8px_rgba(120,120,120,0.2)] transition-all max-w-sm ease-in-out duration-300 cursor-pointer rounded p-1 bg-light400"
  >
    <div class="overflow-hidden h-[170px] w-full rounded p-2">
      <!-- <h-swiper :images="images" :autoplay="autoplay" /> -->
      <nuxt-img
        v-if="images?.length > 0"
        :src="images[0]?.content"
        alt="image"
        class="object-center object-cover"
      />
    </div>
    <hr class="m-1" />
    <div class="px-3 py-1 text-neutral300 text-xs">
      <div class="flex gap-3 items-center">
        <h2 class="font-bold text-base text-neutral200">{{ title }}</h2>
        <Icon
          v-if="licensed"
          name="material-symbols:check-circle-rounded"
          class="w-5 h-5 text-primary"
        />
      </div>
      <div
        class="flex font-extrabold items-center gap-5 py-1"
        v-if="availability"
      >
        <p class="text-sm text-neutral200">{{ availability?.days }}/7 days</p>
        <p class="text-neutral400">{{ availability?.hours }}/24 hrs</p>
      </div>

      <div class="flex gap-3 items-center text-sm py-1">
        <p>Score :</p>
        <svg
          width="18"
          height="16"
          viewBox="0 0 12 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2.50342 9H9.50342M1.00342 1L2.50342 7H9.50342L11.0034 1L8.00342 4.5L6.00342 1L4.00342 4.5L1.00342 1Z"
            stroke="#FFA046"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>

        <p class="text-neutral200 font-bold">{{ score }}</p>
      </div>

      <div class="py-1 flex gap-4 pb-2">
        <p>Supplier :</p>
        <p class="text-primary">{{ supplier }}</p>
      </div>
    </div>
  </NuxtLink>
</template>
<script setup lang="ts">
interface Images {
  type: string;
  content: string;
}
interface availability {
  days: number;
  hours: number;
}

enum Type {
  REALTIME,
  VIRTUAL,
}

interface Props {
  id: any;
  title: string;
  images: Array<Images>;
  licensed: boolean;
  score: number;
  availability?: availability;
  discount?: number;
  autoplay?: boolean;
  supplier: string;
  type: Type;
}
const props = withDefaults(defineProps<Props>(), {
  licensed: false,
  autoplay: false,
});
</script>

<template>
  <NuxtLink
    :to="{
      ...(type === Type.REALTIME
        ? { name: 'services-realtime-detail-id', params: { id: id } }
        : { name: 'services-virtual-detail-id', params: { id: id } }),
    }"
    class="group cursor-pointer rounded overflow-hidden transition-all duration-300 hover:shadow-[0px_0px_24px_8px_rgba(120,120,120,0.2)] p-1 bg-light400 max-w-xs w-full"
  >
    <div class="overflow-hidden h-[170px] w-full">
      <!-- <h-swiper :images="images" :autoplay="autoplay" /> -->
      <nuxt-img
        v-if="images?.length > 0"
        :src="images[0]?.content"
        alt="image"
        class="w-full h-full object-center object-cover group-hover:scale-125 overflow-hidden transition-all ease-in-out duration-300"
      />
    </div>
    <div class="px-3 py-1 bg-primary text-light300 pb-2">
      <div class="flex gap-3 items-center">
        <h2 class="font-bold">{{ title }}</h2>
        <Icon
          v-if="licensed"
          name="material-symbols:check-circle-rounded"
          class="w-4 h-5 text-dark300"
        />
      </div>
      <p class="text-sm line-clamp-1">
        {{ description }}
      </p>
    </div>
  </NuxtLink>
</template>
<script setup lang="ts">
enum Type {
  REALTIME,
  VIRTUAL,
}
interface Images {
  type: string;
  content: string;
}
interface Props {
  id: any;
  title: string;
  images: Images[];
  description?: string;
  licensed?: boolean;
  autoplay?: boolean;
  type: Type;
}
const props = withDefaults(defineProps<Props>(), {
  licensed: false,
  autoplay: false,
});
</script>

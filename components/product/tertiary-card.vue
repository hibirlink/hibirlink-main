<template>
  <nuxt-link
    :to="{
      ...(type === Type.REALTIME
        ? { name: 'products-realtime-detail-id', params: { id: id } }
        : { name: 'products-virtual-detail-id', params: { id: id } }),
    }"
    class="group cursor-pointer rounded overflow-hidden transition-all duration-300 hover:shadow-[0px_0px_24px_8px_rgba(120,120,120,0.2)] p-1 bg-light400 max-w-sm"
  >
    <div class="overflow-hidden h-[170px] w-full p-2 rounded">
      <div class="h-full w-full overflow-hidden rounded-sm">
        <nuxt-img
          :src="image"
          format="webp"
          loading="lazy"
          quality="100"
          fit="inside"
          class="w-full h-full object-center object-cover group-hover:scale-125 overflow-hidden transition-all ease-in-out duration-300"
        />
      </div>
    </div>
    <hr class="m-1" />

    <div class="px-3 py-1 text-dark300 2xl:text-base text-md">
      <h2 class="font-bold text-neutral200 line-clamp-1">{{ title }}</h2>
      <p class="text-primaryvar1 text-xs font-semibold py-0.5" v-if="status">
        {{ status }}
      </p>
      <div class="flex items-end justify-end">
        <div v-if="discount" class="w-fit flex justify-end items-end flex-col">
          <div class="flex gap-2 items-end">
            <span class="line-through font-extrabold text-neutral400 text-sm"
              >{{ price }} ETB</span
            >
            <span class="text-primary text-lg font-extrabold"
              >{{ (price - (price * discount) / 100).toFixed(2) }} ETB</span
            >
          </div>
          <div
            class="px-3 my-2.5 text-xs font-medium bg-primary text-light300 rounded-full"
          >
            {{ discount }}% off
          </div>
        </div>
        <p v-else class="text-primary font-extrabold">{{ price }} ETB</p>
      </div>
    </div>
  </nuxt-link>
</template>
<script setup lang="ts">
enum Type {
  REALTIME,
  VIRTUAL,
}
interface Props {
  id: any;
  title: string;
  discount?: number;
  image: string;
  price: number;
  status?: string;
  type: Type;
}

const props = defineProps<Props>();
</script>

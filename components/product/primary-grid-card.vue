<template>
  <nuxt-link
    :to="{
      ...(type === Type.REALTIME
        ? { name: 'products-realtime-detail-id', params: { id: id } }
        : { name: 'products-virtual-detail-id', params: { id: id } }),
    }"
    class="group max-w-sm rounded overflow-hidden transition-all duration-300 hover:shadow-[0px_0px_24px_8px_rgba(120,120,120,0.2)] p-1 bg-light400"
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
    <div class="px-3 py-1 text-neutral200 text-md">
      <h2 class="font-bold 2xl:text-base text-md line-clamp-1">{{ title }}</h2>
      <!-- <p class="py-1 text-neutral300 text-md" v-if="quantity">
        Quantity : {{ quantity }}
      </p> -->
      <p class="py-1" v-if="quantity && quantity > 0">
        Quantity : {{ quantity }}
      </p>
      <span
        v-if="quantity === 0"
        class="text-xs font-semibold tex-dark300 px-3 rounded-xl bg-red/50"
        >unavailable</span
      >
      <div
        v-if="discount"
        class="w-fit py-1 flex justify-start items-start flex-col"
      >
        <p class="text-neutral300">
          Price :
          <span class="text-primary font-extrabold text-base"
            >{{ (price - (price * discount) / 100).toFixed(2) }} ETB</span
          >
        </p>
        <div class="flex gap-3 items-center text-neutral400">
          <span class="line-through font-extrabold text-sm"
            >{{ price }} ETB</span
          >
          <span
            class="px-3 my-2 w-fit font-medium text-xs bg-primary text-light300 rounded-full"
          >
            {{ discount }}% off
          </span>
        </div>
      </div>
      <p v-else class="text-primary py-1 font-semibold text-sm">
        Price : {{ price }} ETB
      </p>
      <div class="flex gap-1 text-neutral300 items-center py-1">
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

      <div class="flex gap-4 pb-2 items-center text-neutral300 justify-between">
        <p class="line-clamp-1">
          Supplier : <span class="text-primary">{{ supplier }}</span>
        </p>
        <div
          v-if="status"
          class="px-3 my-2 w-fit font-medium text-xs bg-primary text-neutral-100 rounded-full"
        >
          {{ status }}
        </div>
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
  quantity?: number;
  status?: string;
  score?: number;
  supplier: string;
  type: Type;
}
const props = defineProps<Props>();
</script>

<template>
  <nuxt-link
    :to="{
      ...(type === Type.REALTIME
        ? { name: 'products-realtime-detail-id', params: { id: id } }
        : { name: 'products-virtual-detail-id', params: { id: id } }),
    }"
    class="w-full mx-2 rounded hover:shadow-[0px_0px_24px_8px_rgba(120,120,120,0.2)] p-1 transition-all ease-in-out duration-300 bg-light400 py-3"
  >
    <div class="flex gap-4 group items-center bg-light400 px-2 text-md">
      <div class="overflow-hidden w-[100px] h-[200px] md:w-[200px] rounded-sm">
        <nuxt-img
          :src="image"
          format="webp"
          loading="lazy"
          quality="100"
          fit="inside"
          class="w-full h-full object-center object-cover group-hover:scale-125 overflow-hidden transition-all ease-in-out duration-300"
        />
      </div>
      <div class="flex-1 text-neutral200">
        <div class="flex gap-3 items-center py-1">
          <h2 class="font-bold 2xl:text-base text-md">{{ title }}</h2>
        </div>
      <p class="py-1" v-if="quantity && quantity > 0">
        Quantity : {{ quantity }}
      </p>
      <span
        v-if="quantity === 0"
        class="text-xs font-semibold tex-dark300 px-3 rounded-xl bg-red/50"
        >unavailable</span
      >

        <div class="flex gap-4 items-center py-1" v-if="discount">
          <p>
            Price :
            <span class="text-primary font-extrabold text-base"
              >{{ (price - (price * discount) / 100).toFixed(2) }} ETB</span
            >
          </p>
          <p class="line-through font-extrabold text-neutral400 text-sm">
            {{ price }}
          </p>
          <div
            v-if="discount"
            class="px-3 my-2 w-fit font-semibold bg-primary text-light300 rounded-full"
          >
            {{ discount }}% off
          </div>
        </div>
        <p v-else class="py-1">
          Price :
          <span class="text-primary font-extrabold text-sm"
            >{{ price }} ETB</span
          >
        </p>
        <hr class="my-3" />
        <div class="flex gap-x-6 gap-y-2 items-center flex-wrap">
          <div class="flex gap-3 items-center">
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

            <p class="text-neutral200 font-semibold">{{ score }}</p>
          </div>
          <div
            v-if="status"
            class="px-3 w-fit h-fit text-xs rounded-full bg-primary font-semibold text-light300"
          >
            {{ status }}
          </div>
          <div class="items-center w-fit h-fit flex gap-4">
            <p>Supplier :</p>
            <p class="text-primary">{{ supplier }}</p>
          </div>
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
  image: string;
  score: number;
  discount?: number;
  supplier: string;
  quantity?: number;
  price: number;
  status?: string;
  type: Type;
}
const props = defineProps<Props>();
</script>

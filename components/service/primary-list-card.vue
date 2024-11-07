<template>
  <NuxtLink
      :to="{
      ...(type === Type.REALTIME
        ? { name: 'services-realtime-detail-id', params: { id: id } }
        : { name: 'services-virtual-detail-id', params: { id: id } }),
    }"
    class="w-full mx-2 cursor-pointer rounded hover:shadow-[0px_0px_24px_8px_rgba(120,120,120,0.2)] transition-all ease-in-out duration-300 p-1 bg-light400 py-3"
  >
    <div class="flex gap-4 items-center bg-light400 px-2 text-xs">
      <div class="w-[100px] h-[200px] md:w-[200px]">
        <!-- <h-swiper :images="images" :autoplay="autoplay" /> -->
           <nuxt-img
        v-if="images?.length > 0"
        :src="images[0]?.content"
        alt="image"
        class="object-center object-cover"
      />
      </div>
      <div class="flex-1 text-neutral300">
        <div class="flex gap-3 items-center py-1">
          <h2 class="font-bold 2xl:text-base text-md text-neutral200">
            {{ title }}
          </h2>
        </div>
        <div class="flex items-center gap-3 py-1" v-if="availability">
          <p class="font-extrabold text-sm">
            Avilability: {{ availability?.days?.length }}/7 days
          </p>
          <p class="text-neutral300 font-extrabold text-xs">
            {{ availability?.hours }}/24 hrs
          </p>
        </div>

        <hr class="my-3" />
        <div
          class="flex gap-x-6 gap-y-2 text-neutral300 items-center flex-wrap"
        >
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

            <p class="text-dark200 font-bold">{{ score }}</p>
          </div>
          <div
            v-if="licensed"
            class="px-5 w-fit h-fit rounded-full bg-primary font-semibold text-light300"
          >
            licensed
          </div>
          <div class="items-center w-fit h-fit flex gap-4">
            <p>Supplier :</p>
            <p class="text-primary">{{ supplier }}</p>
          </div>
        </div>
        <div class="py-2" v-if="availability">
          <h2 class="font-bold">Working Days</h2>
          <div class="flex gap-3 items-center py-2">
            <div
              v-for="day in availability.days"
              :key="day"
              class="flex gap-1 items-center"
            >
              <Icon
                name="material-symbols:done"
                class="w-5 h-5 text-primaryvar1"
              />
              <p class="font-semibold">{{ day }}</p>
            </div>
          </div>
        </div>
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
  days: Array<string>;
  hours: number;
}

enum Type {
  REALTIME,
  VIRTUAL,
}

interface Props {
  id: any;
  title: string;
  images: Images[];
  licensed: boolean;
  score: number;
  availability?: availability | any;
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

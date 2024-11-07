<template>
  <NuxtLink
      :to="{
      ...(type === Type.REALTIME
        ? { name: 'services-realtime-detail-id', params: { id: id } }
        : { name: 'services-virtual-detail-id', params: { id: id } }),
    }"
    class="group rounded overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-[0px_0px_24px_8px_rgba(120,120,120,0.2)] p-1 bg-light400"
  >
    <div class="h-[170px] w-full rounded p-2 overflow-hidden">
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
    <div class="px-3 py-1 text-neutral300">
      <div class="flex gap-3 items-center">
        <h2 class="font-bold text-neutral200 2xl:text-base text-md">
          {{ title }}
        </h2>
        <Icon
          name="material-symbols:check-circle-rounded"
          class="w-5 h-5 text-primary"
        />
      </div>

      <div class="pb-2">
        <div class="flex gap-3 items-center py-1">
          <p class="text-md">Score :</p>
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
        <div
          :class="[discount ? 'justify-between' : 'justify-end']"
          class="flex items-end"
        >
         
          <div class="flex flex-col justify-end items-end" v-if="availability">
            <p class="text-primary font-extrabold text-base">
              {{ availability?.days }}/7 days
            </p>
            <p class="py-1 text-neutral300 font-extrabold text-md">
              {{ availability?.hours }}/24 hrs
            </p>
          </div>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>
<script setup lang="ts">
interface availability {
  days: number;
  hours: number;
}
enum Type {
  REALTIME,
  VIRTUAL,
}
interface Props {
  id:any;
  title: string;
  discount?: number;
  image: string;
  licensed?: boolean;
  score?: number;
  rate?: number;
  availability?: availability;
  type: Type;
}
const props = withDefaults(defineProps<Props>(), {
  licensed: false,
});
watchEffect(() => {
  console.log(props.type);
});
</script>

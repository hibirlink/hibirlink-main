<template>
  <main class="flex flex-col justify-center items-center">
    <nuxt-img
      :src="`${imageName}.png`"
      format="webp"
      sizes="md:274px sm:72px"
      loading="lazy"
      quality="100"
    />
    <div class="text-center">
      <h1 class="text-5xl font-bold mb-4 text-dark100">
        {{ $t("comming_soon") }}
      </h1>
      <p class="text-lg mb-8 font-medium">
        {{ $t("comming_soon_message") }}
      </p>
      <div class="flex items-center justify-center w-full h-full font-mono">
        <div class="flex flex-col items-center justify-center text-center">
          <div class="text-4xl font-bold mb-4">{{ days }}</div>
          <div class="text-gray-500 text-sm uppercase font-medium mb-2">
            {{ $t("days") }}
          </div>
        </div>
        <div class="mx-4">
          <div class="text-4xl font-bold mb-4">{{ hours }}</div>
          <div class="text-gray-500 text-sm uppercase font-medium mb-2">
            {{ $t("hours") }}
          </div>
        </div>
        <div class="mx-4">
          <div class="text-4xl font-bold mb-4">{{ minutes }}</div>
          <div class="text-gray-500 text-sm uppercase font-medium mb-2">
            {{ $t("minutes") }}
          </div>
        </div>
        <div class="mx-4">
          <div class="text-4xl font-bold mb-4">{{ seconds }}</div>
          <div class="text-gray-500 text-sm uppercase font-medium mb-2">
            {{ $t("seconds") }}
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref } from "vue";
type PropType ={
    imageName: string
}
const props = defineProps<PropType>()
const endDate = new Date("2023-11-31");
const days = ref(0);
const hours = ref(0);
const minutes = ref(0);
const seconds = ref(0);

const updateCountdown = () => {
  const currentTime = new Date();
  const timeDiff = endDate - currentTime;

  if (timeDiff <= 0) {
    clearInterval(countdownInterval);
  }

  days.value = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  hours.value = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
  minutes.value = Math.floor((timeDiff / 1000 / 60) % 60);
  seconds.value = Math.floor((timeDiff / 1000) % 60);
};

const countdownInterval = setInterval(updateCountdown, 1000);
</script>

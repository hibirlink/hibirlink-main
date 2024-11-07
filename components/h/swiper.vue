<template>
  <!-- <div class="rounded-sm overflow-hidden h-full">
    <div class="h-full">
      <div class="overflow-hidden h-full w-full" v-if="images?.length > 0">
        <nuxt-img
          :src="images[0].content"
          format="webp"
          loading="lazy"
          quality="100"
          fit="inside"
          class="w-full h-full hover:scale-125 object-center object-cover overflow-hidden transition-all ease-in-out duration-300"
        />
      </div>
    </div>
  </div> -->
  <Swiper
    class="rounded-sm overflow-hidden h-full"
    v-if="images"
    :modules="[SwiperAutoplay, EffectFade]"
    :slides-per-view="1"
    :preloadImages="true"
    :autoplay="
      autoplay
        ? {
            delay: 2000,
            disableOnInteraction: false,
            waitForTransition: true,
          }
        : undefined
    "
    :loop="true"
    effect="fade"
    :speed="3000"
    :fade-effect="{
      crossFade: true,
    }"
  >
    <SwiperSlide v-for="(image, index) in images" :key="index" class="h-full">
      <nuxt-img
        :src="image?.content"
        format="webp"
        loading="lazy"
        quality="100"
        fit="inside"
        class="w-full h-full hover:scale-125 object-center object-cover overflow-hidden transition-all ease-in-out duration-300"
      />
    </SwiperSlide>
  </Swiper>
</template>
<script setup lang="ts">
import { FreeMode, Navigation, Thumbs, EffectFade } from "swiper";

interface Images {
  type: string;
  content: string;
}
interface Props {
  images: Array<Images>;
  autoplay?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  autoplay: false,
});
</script>

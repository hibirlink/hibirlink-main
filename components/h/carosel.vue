<template>
  <div ref="zoomContainer">
    <Swiper
      class="rounded-sm overflow-hidden"
      :modules="[SwiperAutoplay, EffectFade, FreeMode, Navigation, Thumbs]"
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
      @real-index-change="changeIndex"
      :thumbs="{ swiper: thumbsSwiper }"
      :navigation="true"
      :loop="true"
      :effect="'fade'"
      :speed="3000"
      :fade-effect="{
        crossFade: true,
      }"
    >
      <SwiperSlide v-for="(image, index) in images" :key="index">
        <div
          class="h-[270px] relative rounded-lg border border-gray-200"
          @mousemove="handleMouseMove"
          @mouseleave="resetZoom"
        >
          <nuxt-img
            :src="image.content"
            format="webp"
            loading="lazy"
            quality="100"
            fit="inside"
            class="w-full rounded-sm h-[270px] object-center object-contain overflow-hidden transition-all ease-in-out duration-500"
          />
          <img src="" alt="" />
          <div
            class="absolute top-0 left-0 bg-light200 opacity-50 w-fit h-fit border border-gray-200"
            :class="{ hidden: !showZoom }"
            :style="magnifyingGlassStyle"
          ></div>

          <div
            v-if="showZoom"
            class="absolute top-10 right-500 z-50 bg-white border border-gray-200 shadow-md rounded-lg"
            :style="zoomWindowStyle"
          >
            <!-- <img :src="imageUrl" :style="zoomedImageStyle" alt="Zoomed Product" /> -->
            <img
              :src="image.content"
              class="w-[30rem] h-[90rem] object-contains filter-none"
              alt="Product"
              :style="zoomedImageStyle"
            />
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
    <swiper
      v-if="gallery && images.length > 1"
      @swiper="setThumbsSwiper"
      class="my-4 overflow-x-visible flex gap-4 thumb"
      :slidesPerView="5"
      :freeMode="true"
      :navigation="true"
      :watchSlidesProgress="true"
      :modules="[
        SwiperAutoplay,
        SwiperEffectCreative,
        FreeMode,
        Navigation,
        Thumbs,
      ]"
    >
      <SwiperSlide
        v-for="(image, index) in images"
        :key="index"
        @click="activeThumb = index"
        class="mr-1 block"
      >
        <div
          :class="
            index != activeThumb
              ? 'after:w-full after:h-full after:absolute after:top-0 after:left-0 after:bg-dark300/60'
              : ''
          "
          class="overflow-hidden h-[70px] w-[70px] relative rounded-sm"
        >
          <nuxt-img
            :src="image.content"
            format="webp"
            loading="lazy"
            quality="100"
            fit="inside"
            class="w-full rounded-sm h-full object-center object-cover overflow-hidden transition-all ease-in-out duration-500"
          />
          <img src="" alt="" />
        </div>
      </SwiperSlide>
    </swiper>
  </div>
</template>
<script setup lang="ts">
import { EffectFade, FreeMode, Navigation, Thumbs } from "swiper";

const curIndex = ref(0);
setTimeout(() => {
  curIndex.value = 1;
}, 1000);
interface Data {
  content: string;
  type: string;
}
interface Props {
  images: Data[];
  gallery: boolean;
  autoplay?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  gallery: false,
  autoplay: false,
});

const changeIndex = (val: any) => {
  activeThumb.value = val.realIndex;
};
const activeThumb = ref(0);

const thumbsSwiper = ref(null);
const setThumbsSwiper = (swiper: any) => {
  thumbsSwiper.value = swiper;
};

const zoomLevel = 2;
const zoomContainer = ref(null);
const showZoom = ref(false);
const mouseX = ref(0);
const mouseY = ref(0);

const imageUrl = "path/to/product-image.jpg";

const zoomStyle = reactive({
  width: "100%",
  height: "100%",
  objectFit: "contain",
});

const zoomWindowStyle = reactive({
  width: "400px",
  height: "400px",
  transform: "scale(0)",
  transformOrigin: "top left",
});

const zoomedImageStyle = reactive({
  width: "100%",
  height: "100%",
  objectFit: "contain",
});

const magnifyingGlassStyle = reactive({
  width: "200px",
  height: "200px",
  transform: "translate(-50%, -50%)",
  borderRadius: "50%",
  pointerEvents: "none",
});

// const props = withDefaults(defineProps<Props>(), {
//   gallery: false,
//   autoplay: false,
// });
const content = computed(() => {
  props.images[0].content;
});

const handleMouseMove = (event) => {
  if (zoomContainer.value) {
    const { left, top, width, height } =
      zoomContainer.value.getBoundingClientRect();
    const offsetX = event.pageX - left;
    const offsetY = event.pageY - top;

    mouseX.value = offsetX;
    mouseY.value = offsetY;

    const zoomX = (offsetX / width) * 100;
    const zoomY = (offsetY / height) * 100;

    magnifyingGlassStyle.left = `${offsetX}px`;
    magnifyingGlassStyle.top = `${offsetY}px`;

    zoomWindowStyle.transform = `scale(${zoomLevel})`;
    zoomWindowStyle.transformOrigin = `${zoomX}% ${zoomY}%`;
    zoomWindowStyle.left = `-${zoomX / zoomLevel}px`;
    zoomWindowStyle.top = `-${zoomY / zoomLevel}px`;

    showZoom.value = true;
  }
};

const resetZoom = () => {
  showZoom.value = false;
};
</script>

<style>
.swiper-button-prev,
.swiper-button-next {
  color: rgba(255, 255, 255, 0.5);
}

.object-contains {
  object-fit: contain;
  image-rendering: crisp-edges;
}
</style>

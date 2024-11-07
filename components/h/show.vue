<template>
  <div class="flex justify-center items-center h-screen">
    <div class="relative">
      <div
        class="relative overflow-hidden rounded-lg border border-gray-200"
        @mousemove="handleMouseMove"
        @mouseleave="resetZoom"
      >
        <img
          src="https://m.media-amazon.com/images/I/513NI5xpYjL._AC_SX425_.jpg"
          class="w-96 h-96 object-contain"
          ref="zoomContainer"
          alt="Product"
        />
        <div
          class="absolute top-0 left-0 bg-light200 opacity-50 border border-gray-200"
          :class="{ hidden: !showZoom }"
          :style="magnifyingGlassStyle"
        ></div>

        <div
          v-if="showZoom"
          class="absolute top-10 right-96 bg-white border border-gray-200 shadow-md rounded-lg"
          :style="zoomWindowStyle"
        >
          <!-- <img :src="imageUrl" :style="zoomedImageStyle" alt="Zoomed Product" /> -->
          <img
            src="https://m.media-amazon.com/images/I/513NI5xpYjL._AC_SX425_.jpg"
            class="w-[30rem] h-[20rem] object-contains"
            alt="Product"
            :style="zoomedImageStyle"
          />
        </div>
        <!-- <div
          v-if="showZoom"
          class="absolute top-0 left-0 bg-white border border-gray-200"
        >
       
        </div>-->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";

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
interface Props {
  images: Data[];
  gallery: boolean;
  autoplay?: boolean;
}
const magnifyingGlassStyle = reactive({
  width: "200px",
  height: "200px",
  transform: "translate(-50%, -50%)",
  borderRadius: "50%",
  pointerEvents: "none",
});

const props = withDefaults(defineProps<Props>(), {
  gallery: false,
  autoplay: false,
});
const content = computed(() => {
  props.images[0].content;
});

const handleMouseMove = (event) => {
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
};

const resetZoom = () => {
  showZoom.value = false;
};
</script>

<style>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.relative {
  position: relative;
}

.overflow-hidden {
  overflow: hidden;
}

.rounded-lg {
  border-radius: 0.5rem;
}

.border {
  border-width: 1px;
  border-style: solid;
}

.border-gray-200 {
  border-color: #edf2f7;
}

.absolute {
  position: absolute;
}

.top-0 {
  top: 0;
}

.left-0 {
  left: 0;
}

.bg-white {
  background-color: #fff;
}

.w-96 {
  width: 24rem;
}

.h-96 {
  height: 24rem;
}

.object-contains {
  object-fit: contain;
  image-rendering: crisp-edges;
}

.scale-0 {
  transform: scale(0);
}

.transition-all {
  transition-property: all;
  transition-timing-function: ease-in-out;
  transition-duration: 0.3s;
}

.transform-origin-center {
  transform-origin: center center;
}

.transform-origin {
  transform-origin: var(--tw-transform-origin, 0);
}

.transform {
  transform: var(--tw-transform, none);
}

.rounded-sm {
  border-radius: 0.125rem;
}

.pointer-events-none {
  pointer-events: none;
}
</style>

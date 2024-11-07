<template>
  <main
    v-if="showLoading"
    class="fixed top-0 left-0 w-full min-h-screen bg-neutral-800 bg-opacity-10 z-50"
  >
    <div class="w-full min-h-screen flex flex-col items-center justify-center">
      <div
        class="p-5 flex flex-col items-center justify-center bg-light400 rounded-md text-primary gap-2"
      >
        <Icon name="svg-spinners:dot-revolve" class="w-10 h-10 text-primary" />
        <p>{{ loadingText }}</p>
      </div>
    </div>
  </main>
</template>

<script lang="ts" setup>
interface PropsInterface {
  loadingText?: string;
  showLoading: boolean;
}

const props = withDefaults(defineProps<PropsInterface>(), {
  loadingText: "Loading...",
});
</script>

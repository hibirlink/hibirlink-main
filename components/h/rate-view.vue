<template>
  <div
    class="container flex flex-col w-full px-2 py-1 mx-auto divide-y rounded-md divide-neutral500 bg-light400 shadow-custom text-neutral300"
  >
    <div class="flex justify-between p-2">
      <div class="flex space-x-4 items-center justify-center">
        <div
          class="w-10 h-10 rounded-full flex items-center justify-center bg-primary text-ligh400 font-semibold font-mono"
        >
          {{ reviewerName[0] }}
        </div>
        <div class="flex flex-col">
          <h4 class="font-bold">{{ reviewerName }}</h4>
          <span class="text-xs bg-neutral400 font-semibold">{{
            reviewDate
          }}</span>
        </div>
      </div>
      <div class="flex items-center space-x-2 text-primary">
        <Icon name="bxs:star" class="w-4 h-4 stroke-2 stroke-primary" />
        <span class="font-bold text-sm">4.5</span>
      </div>
    </div>
    <div class="p-2 py-4 space-y-2 text-sm text-neutral400">
      <p>
        {{ reviewContent }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
interface PropsInterface {
  reviewerName: string;
  reviewContent?: string;
  rateValue?: number;
  reviewDate: string;
}

const props = defineProps<PropsInterface>();
</script>

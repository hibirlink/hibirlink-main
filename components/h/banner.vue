<template>
  <div
    class="px-6 py-8 bg-gradient-to-r from-[#1754CF] to-[#477EEB7D]/50 text-gray-900 rounded-md"
  >
    <div class="container mx-auto">
      <div class="flex flex-col lg:flex-row items-center justify-between px-5">
        <div class="flex flex-col gap-2 text-light300">
          <h2 class="text-start text-3xl tracking-tighter font-bold">
            {{title || "We connect everything"}}
          </h2>

          <p class="font-semibold text-lg">
            An onlie ecosystem designed to connect communites
          </p>
        </div>
        <div class="flex gap-5">
          <div
            class="cursor-pointer flex flex-col gap-2 text-sm text-center max-w-[8rem] px-5 py-4 w-full items-center justify-center rounded-md bg-light200 text-neutral100"
          >
            <Icon
              name="material-symbols:browse-activity-outline-sharp"
              class="w-7 h-7"
            ></Icon>

            <p class="">Elegant Solution</p>
          </div>

          <div
            class="cursor-pointer flex flex-col gap-2 text-sm text-center max-w-[8rem] px-5 py-4 w-full items-center justify-center rounded-md bg-light200 text-neutral100"
          >
            <Icon name="clarity:lightbulb-line" class="w-7 h-7"></Icon>

            <p class="">Reach Services</p>
          </div>

          <div
            class="cursor-pointer flex flex-col gap-2 text-sm text-center max-w-[8rem] px-5 py-4 w-full items-center justify-center rounded-md bg-light200 text-neutral100"
          >
            <Icon name="material-symbols:av-timer" class="w-7 h-7"></Icon>

            <p class="">on Demand and on Time</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
interface Props{
  title?: string
}
defineProps<Props>()
</script>

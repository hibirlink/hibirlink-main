<template>
  <ul :class="['w-full flex flex-col gap-6', parentClass]">
    <li
      class="w-full flex justify-center sticky bg-light300 bg-opacity-20 backdrop-blur z-30 top-[2.8rem] -left-10 right-0 gap-8 border-b-2 items-center"
    >
      <button
        type="button"
        class="relative group py-2 px-2.5 font-bold gorup before:content-[''] before:absolute hover:before:left-0 hover:before:right-0 before:-bottom-0.5 before:bg-primaryvar1 before:h-[0.15rem] hover:before:w-full before:rounded-full before:transition-all before:ease-in-out before:duration-200 transition-colors ease-in-out duration-200"
        :class="[
          activeTab === tab.text
            ? 'before:w-full before:left-0 before:right-0 text-primaryvar1'
            : 'before:w-0 before:left-1/2 before:right-1/2 text-neutral200',
          tabClass,
        ]"
        v-for="tab in tabs"
        :key="tab.text"
        @click="
          ($event) => {
            activeTab = tab.text;
          }
        "
      >
        <Icon
          v-if="tab.icon"
          :name="tab.icon"
          class="group-hover:text-primaryvar1 w-6 h-6"
        />
        {{ $t(tab.text) }}
        <small
          v-if="tab?.badge"
          class="absolute z-50 px-1 py-0.5 -top-0.5 -right-1 bg-purple min-w-[1.25rem] h-5 rounded-full text-light300 text-center"
          >{{ tab?.badge }}</small
        >
      </button>
    </li>
    <slot :name="activeTab" :activeTab="activeTab"> </slot>
  </ul>
</template>

<script setup lang="ts">
import { watch } from "fs";
import { watchEffect } from "vue";
import { ref } from "vue";

interface List {
  text: string;
  icon?: string;
  badge?: number;
}

interface ListInterface {
  tabs: Array<List>;
  parentClass?: string;
  tabClass?: string;
}

const props = defineProps<ListInterface>();
const activeTab = ref<string>(props.tabs[0].text);

const emits = defineEmits(["activeTabNameChange"]);

watchEffect(() => {
  emits("activeTabNameChange", activeTab.value);
});
</script>

<template>
  <TransitionRoot as="div" :show="open_dropdown">
    <div
      class="absolute h-[20rem] sm:w-fit w-full"
      @mouseleave="open_dropdown = false"
    >
      <TransitionChild
        as="template"
        enter="ease-in-out sm:duration-200 "
        enter-from="translate-y-5"
        enter-to="translate-y-0"
        leave="ease-in-out sm:duration-200 hidden"
        leave-from="translate-y-5"
        leave-to="translate-y-0"
      >
        <div class="mt-6 flex flex-row gap-0 px-4">
          <ul
            class="sm:w-[25rem] w-full xs:w-[23rem] h-[20rem] shadow-[0px_0px_24px_8px_rgba(120,120,120,0.1)] bg-light400 pb-8 overflow-y-auto flex flex-col text-dark200 font-semibold py-3 rounded-l-md px-4"
          >
            <li
              v-for="item in allCategory"
              @mouseenter="routCategory(item.id)"
              :class="{ 'text-dark100 bg-primaryvar1': item.id == index }"
              @click="click_category({ id: item.id, name: item.name })"
              class="w-full px-3 py-3 group hover:bg-primaryvar1 hover:text-dark100 cursor-pointer rounded text-sm font-bold flex items-center gap-3"
              :key="item.id"
            >
              <div
                class="flex flex-col flex-1 group-hover:text-light300"
                :class="{ 'text-light300': item.id == index }"
              >
                <span>{{ item.name }}</span>
                <!-- <small
                  v-if="subCategory?.length > 0"
                  class="text-neutral300 group-hover:text-neutral600"
                  :class="{ 'text-neutral600': item.id == index }"
                  >
                  {{ 
                  
sub_category?.length
                  
                  }}
                  </small
                > -->
              </div>
              <Icon
                name="ic:round-arrow-right-alt"
                class="w-0 h-5 group-hover:w-5 transition-all ease-in-out duration-500 text-light300"
              />
            </li>
          </ul>
          <hr class="w-[1px] h-full" />
          <ul
            v-if="sub_category?.length > 0"
            class="hidden w-fit min-w-[16rem] max-3-xs md:flex shadow-[22px_0px_20px_4px_rgba(120,120,120,0.1)] h-[20rem] overflow-y-auto flex-col gap-1.5 text-dark200 font-semibold py-3 rounded-r-md px-4 bg-light400"
          >
            <li
              v-for="item in sub_category"
              @click="click_sub_category({ id: item.id, name: item.name })"
              class="w-full px-3 py-2.5 hover:bg-primaryvar1 hover:text-light300 font-semibold cursor-pointer rounded text-sm"
              :key="item.id"
            >
              <span
                ><Icon name="cib:slashdot" class="mr-2 text-neutral500" />{{
                  item.name
                }}</span
              >
            </li>
          </ul>
        </div>
      </TransitionChild>
    </div>
  </TransitionRoot>
</template>

<script setup lang="ts">
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";

interface SubCategory {
  name: string;
  id: string;
}

interface MainCategory {
  name: String;
  id: any;
  subCategory?: Array<SubCategory>;
}

const props = defineProps({
  modelValue: Boolean,
  allCategory: Array<MainCategory>,
});

const emits = defineEmits([
  "select:category",
  "select:subCategory",
  "update:modelValue",
]);
const index = ref(null);

const sub_category = computed(() => {
  if (index.value)
    return props.allCategory?.find((element) => {
      return element.id == index.value;
    })?.subCategory;

  return [];
});

const open_dropdown = computed({
  get: () => {
    return props.modelValue;
  },
  set(newValue) {
    emits("update:modelValue", newValue);
  },
});

const routCategory = (value: any) => {
  index.value = value;
};

const click_category = (value: any) => {
  open_dropdown.value = false;
  emits("select:category", value);
};

const click_sub_category = (value: any) => {
  emits("select:subCategory", value);
};
</script>

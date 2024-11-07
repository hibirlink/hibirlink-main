<template>
  <div class="w-full flex py-2 relative gap-0">
    <Listbox v-model="selected_category" v-if="categories.length > 0">
      <div class="relative w-fit">
        <ListboxButton
          class="relative h-[3rem] border border-primaryvar1 text-light400 min-w-[8rem] flex justify-between items-center gap-3 cursor-default rounded-l-lg px-2 bg-primaryvar1 focus:outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-light100 focus-visible:ring-opacity-75 focus-visible:ring-offset-2 sm:text-sm"
        >
          <span
            v-if="selected_category.id !== 'all'"
            class="block truncate text-base sm:max-w-[10rem] max-w-[6rem] lg:max-w-[13rem] overflow-hidden"
            >{{ selected_category.name }}</span
          >
          <span
            v-if="selected_category.id === 'all'"
            class="block truncate text-base sm:max-w-[10rem] max-w-[6rem] lg:max-w-[13rem] overflow-hidden"
            >{{ $t("all") }}</span
          >

          <Icon name="uil:arrow" class="rotate-90 text-lg"></Icon>
        </ListboxButton>
        <transition
          enter-active-class="transition duration-100 ease-out"
          enter-from-class="transform scale-95 opacity-0"
          enter-to-class="transform scale-100 opacity-100"
          leave-active-class="transition duration-75 ease-out"
          leave-from-class="transform scale-100 opacity-100"
          leave-to-class="transform scale-95 opacity-0"
        >
          <ListboxOptions
            class="absolute py-2 max-h-60 w-fit max-w-fit flex flex-col gap-1 z-50 overflow-y-auto rounded-md bg-light400 text-base shadow-lg ring-1 ring-primary ring-opacity-5 focus:outline-none sm:text-sm"
          >
            <ListboxOption
              as="template"
              v-for="category in with_category_localization"
              :key="category.id"
              :value="category"
              v-slot="{ active, selected }"
              ><li
                class="py-1 hover:bg-primaryvar2 px-1 whitespace-nowrap text-sm flex gap-0 cursor-default"
              >
                <div class="w-[1.5rem]">
                  <Icon
                    name="uil:check"
                    v-if="selected"
                    class="text-lg text-primaryvar3"
                  />
                </div>
                <span class="">{{ category.name }}</span>
              </li>
            </ListboxOption>
          </ListboxOptions>
        </transition>
      </div>
    </Listbox>
    <div class="w-full">
      <Combobox v-model="selected_value" @update:modelValue="updateSearch">
        <div class="w-full relative">
          <ComboboxInput
            :placeholder="placeholder"
            type="search"
            class="h-[3rem] placeholder:text-slate-300 placeholder:text-sm pl-3 bg-light200/30 text-light100 backdrop-blur-lg outline-none ring-offset-0 border-2 border-primaryvar3 focus:border-green300 w-full"
            @keyup="onChange"
            :display-value="(value:any)=>value"
            :class="[categories.length > 0 ? 'rounded-r-md' : 'rounded']"
          />
          <span>
            <h-voice_search
              class="w-[3rem] h-[2rem] absolute right-6 top-0"
              @speak="voiceSpeak"
            />
          </span>
          <span
            @click="searchClicked"
            class="absolute right-0 top-0 flex items-center justify-center h-[3rem] border border-primaryvar2 hover:border-green400 hover:cursor-pointer hover:bg-primaryvar3 bg-primaryvar2 px-3 rounded-r"
          >
            <Icon name="uil:search" class="w-5 h-5 text-white"></Icon>
          </span>
        </div>
        <div class="relative w-full bg-black">
          <ComboboxOptions
            class="bg-light400 rounded absolute drop-shadow-lg shadow-md z-10 top-[0.25rem] left-0 w-full"
            :class="[
              !(query === '' || (data.length < 1 && query !== ''))
                ? 'border-primary border-[1px] border-opacity-50'
                : '',
            ]"
          >
            <ComboboxOption
              v-for="searched in data"
              :key="searched"
              :value="searched"
              v-slot="{ selected, active }"
            >
              <li
                class="cursor-pointer relative hover:text-white flex gap-2 hover:bg-primary text-sm font-semibold py-1 pl-5"
                :class="{
                  '': selected,
                  'bg-primary text-white': active,
                }"
              >
                {{ searched }}
              </li>
            </ComboboxOption>
          </ComboboxOptions>
        </div>
      </Combobox>
    </div>
  </div>
</template>
<script setup lang="ts">
import {
  Combobox,
  ComboboxInput,
  ComboboxLabel,
  ComboboxOptions,
  ComboboxOption,
  Listbox,
  ListboxLabel,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/vue";

const { t } = useI18n();

interface CategoryPropsInterface {
  name: string | any;
  id: any;
}

interface AutoCompletePropsInterface {
  modelValue?: string;
  data?: string[] | string | any;
  placeholder: string;
  categories?: Array<CategoryPropsInterface> | any;
}

const props = withDefaults(defineProps<AutoCompletePropsInterface>(), {
  modelValue: "",
  data: [],
  categories: [],
});

const emit = defineEmits<{
  (e1: "update:data", id: string | number): void;
  (e1: "update:value", value: string | number): void;
  (e1: "select:category", value: { name: string; id: any }): void;
}>();

const selected_value = ref("");
const query = ref("");

const with_category_localization = computed(() => {
  if (props.categories?.length)
    return [{ name: t("all"), id: "all" }, ...props.categories];
  return [];
});

const updateSearch = (value: any) => {
  console.log("update change");
  if (value?.title) {
    selected_value.value = value?.title;
    emit("update:data", value?.title);
  } else {
    selected_value.value = value;
    emit("update:data", value);
  }
};

const searchClicked = () => {
  updateSearch(query.value);
};

const voiceSpeak = (value) => {
  query.value = value;
  emit("update:value", value);
};

const onChange = (event: any) => {
  query.value = event.target.value;
  emit("update:value", event.target.value);
};
const selected_category: Ref<{ name: string; id: any }> = ref({
  name: t("all"),
  id: "all",
});

watch(selected_category, (value) => {
  emit("select:category", value);
});
</script>

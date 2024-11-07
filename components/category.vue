<template>

<div
        class="flex-1 w-full flex xl:flex-nowrap flex-wrap items-center overflow-x-auto gap-6"
      >
        <NuxtLink
          v-for="category in physicalProductCategory"
          :key="category.id"
          :to="{
            name: 'products-category-name-id',
            params: { name: category.name, id: category.id },
          }"
          @mouseenter="
            selected_category = category.id;
            show = true;
          "
          class="flex-1 flex items-center relative min-w-fit gap-3 2xl:text-base text-md font-semibold text-dark100"
        >
          <nuxt-img
            :src="category.logo"
            format="webp"
            loading="lazy"
            quality="100"
            fit="cover"
            width="32px"
            height="32px"
            class="rounded-full w-[32px] h-[32px]"
          />
          <p>{{ category?.name }}</p>

          <h-nested-dropdown
            :all-category="for_dropdown_category"
            @select:category="select_category_handler"
            class="absolute top-0 left-0 z-50"
            v-model="show"
          />
        </NuxtLink>
      </div>

</template>


<script setup lang="ts">
import {useStore} from "~/store/data"
const open = ref(false);
const selected_category = ref();
const store = useStore();
const route = useRoute();
const router = useRouter();
const { locale } = useI18n();


const for_dropdown_category = computed(() => {
  if (selected_category.value != null && selected_category.value != undefined)
    return store
      .getPhysicalProductSubCategoryByCategory(
        locale.value,
        selected_category.value
      )
      .map((element) => {
        return {
          name: element?.name[0]?.name,
          logo: element?.logo,
          id: element?.id,
        };
      });

  return [];
});

const select_category_handler = ()=>{






}

</script>
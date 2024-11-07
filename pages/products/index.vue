<template>
  <main
    class="flex relative flex-col gap-6 items-center w-full justify-center z-0"
  >
    <nuxt-img
      src="/product-banner.jpg"
      format="webp"
      loading="lazy"
      quality="100"
      fit="cover"
      sizes="md:100vw sm:100vw"
      class="h-52 w-[100vw] absolute top-0 left-0 right-0 bottom-0 -z-10"
    />
    <div
      class="h-52 w-[100vw] absolute top-0 left-0 right-0 bottom-0 bg-dark300 bg-opacity-20 -z-10"
     />

    <div class="flex gap-2 w-full justify-center md:gap-5 items-center mt-8">
      <div
        :class="
          /^\/products(?!(\/virtual))+/i.test(currentPath)
            ? 'text-light300 border-light300'
            : 'text-dark100 border-dark100'
        "
        class="font-semibold text-light300 border-light300 transition-colors ease-in-out duration-200 border-b-2 px-8 py-1 rounded-sm cursor-pointer hover:border-light100 hover:text-light100 backdrop-blur-sm"
      >
        <NuxtLink :to="{ name: 'products-index' }">
          Physical Products
        </NuxtLink>
      </div>

      <label
        for="Toggle1"
        class="inline-flex items-center space-x-4 cursor-pointer dark:text-gray-100"
      >
        <span @click="handleProductTypeChange" class="relative">
          <input
            id="Toggle1"
            v-model="isPhysicalProduct"
            @click="handleProductTypeChange"
            type="checkbox"
            class="hidden peer"
          />
          <div
            class="w-10 h-6 rounded-full shadow-inner bg-neutral500 peer-checked:bg-neutral500"
          ></div>
          <div
            class="absolute inset-y-0 left-0 w-4 h-4 m-1 rounded-full shadow peer-checked:right-0 peer-checked:left-auto bg-primary"
          ></div>
        </span>
      </label>

      <div
        :class="
          /^\/products\/virtual/i.test(currentPath)
            ? 'text-dark100 border-light300'
            : 'text-light300 border-light300'
        "
        class="font-semibold text-light300 border-light300 transition-colors ease-in-out duration-200 border-b-2 px-8 py-1 rounded-sm cursor-pointer hover:border-light100 hover:text-light100 backdrop-blur-sm"
      >
        <NuxtLink :to="{ name: 'products-index-virtual' }">
          Virtual Products
        </NuxtLink>
      </div>
    </div>

    <h-auto-complete
      v-if="!isPhysicalProduct"
      placeholder="Search By  title"
      :categories="physical_category"
      @select:category="select_category_for_search"
      :data="physical_product_search_data"
      @update:data="click_specific_product_handler"
      @update:value="physical_product_update_handler"
      class="max-w-3xl w-full px-[5%]"
    />
    <h-auto-complete
      v-else
      placeholder="Search By  title"
      :categories="virtual_product_category"
      @select:category="select_virtual_category"
      @update:data="virtual_specific_product_handler"
      @update:value="virtual_product_update_handler"
      :data="virtual_product_search_data"
      class="max-w-3xl w-full px-[5%]"
    />

    <section class="h-full w-full">
      <NuxtPage />
    </section>
  </main>
</template>

<script lang="ts" setup>
import physical_product from "~/apollo/query/product/realtime/fetch_product.gql";
import virtual_product from "~/apollo/query/product/virtual/product.gql";
import { useStore } from "~/store/data";
const store = useStore();
const route = useRoute();
const router = useRouter();
const { locale } = useI18n();
const currentPath = computed(() => route.path);
const selected_category_id = ref();
const selected_virtual_category_id = ref();
const physical_product_search_variable = ref("");
const virtual_product_search_variable = ref("");
const isPhysicalProduct = computed(() => {
  return !/^\/products(?!(\/virtual))+/i.test(currentPath.value);
});

const physical_product_variable = computed(() => {
  return {
    where: {
      title: {
        _iregex: physical_product_search_variable.value?.replace(
          /[.+*?^${}()|[\]\\]/g,
          "\\$&"
        ),
      },
      release_status: {
        _eq: "verified",
      },
      ...(selected_category_id.value && selected_category_id?.value != "all"
        ? {
            physical_product_sub_category: {
              category_id: { _eq: selected_category_id.value },
            },
          }
        : {}),
    },
  };
});

const virtual_product_variable = computed(() => {
  return {
    where: {
      title: {
        _iregex: virtual_product_search_variable.value?.replace(
          /[.+*?^${}()|[\]\\]/g,
          "\\$&"
        ),
      },
      release_status: {
        _eq: "verified",
      },
      ...(selected_virtual_category_id.value &&
      selected_virtual_category_id?.value != "all"
        ? {
           
              category_id: { _eq: selected_virtual_category_id.value },
            
          }
        : {}),
    },
  };
});

const {
  result: physical_product_search_result,
  error: physical_product_search_result_error,
  loading: physical_product_search_loading,
} = useCustomQuery(physical_product, physical_product_variable, 500);
const {
  result: virtual_product_search_result,
  error: virtual_product_search_result_error,
  loading: virtual_product_search_loading,
} = useCustomQuery(virtual_product, virtual_product_variable, 500);
const physical_product_search_data = computed(() => {
  return physical_product_search_result?.value?.product?.map((element: any) => {
    return element?.title;
  });
});

const virtual_product_search_data = computed(() => {
  return virtual_product_search_result?.value?.product?.map((element: any) => {
    return element?.title;
  });
});

const physical_category = computed(() => {
  return store.getPhysicalProductCategory(locale.value).map((element) => {
    return {
      id: element.id,
      name: element?.name[0]?.name,
    };
  });
});

const handleProductTypeChange = () => {
  if (isPhysicalProduct.value) {
    router.push("/products/");
  } else {
    router.push("/products/virtual");
  }
};

const virtual_product_category = computed(() => {
  return store.getVirtualProductCategory(locale.value).map((element) => {
    return {
      id: element?.id,
      name: element?.name?.name,
    };
  });
});

const physical_product_update_handler = (value) => {
  physical_product_search_variable.value = value;
};

const virtual_product_update_handler = (value) => {
  virtual_product_search_variable.value = value;
};

const select_category_for_search = (value) => {
  selected_category_id.value = value?.id;
};

const click_specific_product_handler = (result: any) => {
  router.push({
    name: "products-index-search-realtime",
    query: { name: result },
  });
};

const virtual_specific_product_handler = (result: any) => {
  router.push({
    name: "products-index-search-virtual",
    query: { name: result },
  });
};

const select_virtual_category = (value) => {
  selected_virtual_category_id.value = value?.id;
};

useHead({
  title: "Products",
});

definePageMeta({
  layout: "custom",
});
</script>

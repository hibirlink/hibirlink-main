<template>
  <main
    class="flex relative flex-col gap-5 items-center w-full justify-center z-0 h-full"
  >
    <nuxt-img
      src="/category-banner.jpg"
      format="webp"
      loading="lazy"
      quality="100"
      fit="cover"
      sizes="md:100vw sm:100vw"
      class="h-52 w-[100vw] absolute top-0 left-0 right-0 bottom-0 -z-10"
    />
    <div
      class="h-52 w-[100vw] absolute top-0 left-0 right-0 bottom-0 bg-dark300 bg-opacity-30 -z-10"
    />
    <div class="flex flex-col w-full justify-center md:gap-5 items-center mt-4">
      <h1 class="text-light200 text-3xl font-semibold capitalize">
        {{ route?.params?.name }}
      </h1>

      <h-bread-crumb class="w-fit"></h-bread-crumb>
    </div>

    <h-auto-complete
      placeholder="Search By  title"
      :categories="physical_category"
      @select:category="select_category_for_search"
      :data="physical_product_search_data"
      @update:data="click_specific_product_handler"
      @update:value="physical_product_update_handler"
      class="max-w-3xl w-full px-[5%]"
    />
    <section class="h-full w-full">
      <NuxtPage />
    </section>
  </main>
</template>

<script lang="ts" setup>
import physical_product from "~/apollo/query/product/realtime/fetch_product.gql";
import { useStore } from "~/store/data";
const store = useStore();
const route = useRoute();
const router = useRouter();
const { locale } = useI18n();
const selected_category_id = ref();
const physical_product_search_variable = ref("");

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

const {
  result: physical_product_search_result,
  error: physical_product_search_result_error,
  loading: physical_product_search_loading,
} = useCustomQuery(physical_product, physical_product_variable, 500);

const physical_product_search_data = computed(() => {
  return physical_product_search_result?.value?.product?.map((element: any) => {
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

const physical_product_update_handler = (value) => {
  physical_product_search_variable.value = value;
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

const selected_category = (value) => {
  console.log(value);
};

useHead({
  title: "Products",
});

definePageMeta({
  layout: "custom",
});
</script>

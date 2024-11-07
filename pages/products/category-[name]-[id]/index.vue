<template>
  <section class="w-full flex flex-col gap-6">
    <nav
      class="w-full xl:h-14 h-fit p-3 bg-light300 rounded-md flex gap-6 justify-start items-start"
    >
      <div
        class="flex items-center relative gap-2 2xl:text-base text-md font-semibold hover:text-primary"
        @mouseenter="open = true"
      >
        <Icon name="icon-park-solid:all-application" class="w-5 h-5" />
        <span>All</span>
        <h-nested-dropdown
          :all-category="allCategory"
          class="absolute top-0 left-0 z-30"
          @select:category="select_category_handler"
          @select:sub-category="select_sub_category_handler"
          v-model="open"
        />
      </div>
      <div
        v-if="getSubCategory?.length > 0"
        class="flex-1 w-full flex xl:flex-nowrap flex-wrap items-center overflow-x-auto gap-6"
      >
        <NuxtLink
          v-for="category in getSubCategory"
          :key="category.id"
          :to="{
            name: 'products-category-name-id-sub-category-sub_name-sub_id',
            params: {
              name: route?.params?.name,
              id: category.category_id,
              sub_name: category.name,
              sub_id: category.id,
            },
          }"
          class="flex-1 flex items-center min-w-fit gap-3 2xl:text-base text-md font-semibold"
          :class="[
            route.params?.id == category.id ? 'text-primary' : 'text-dark100',
          ]"
        >
          <nuxt-img
            :src="category?.logo"
            format="webp"
            loading="lazy"
            quality="100"
            fit="cover"
            width="32px"
            height="32px"
            class="rounded-full w-[32px] h-[32px]"
          />
          <p>{{ category.name }}</p>
        </NuxtLink>
      </div>
    </nav>

    <section class="max-w-[90rem] mx-auto w-full flex flex-col gap-6">
      <div class="flex gap-20 items-center justify-center w-full px-5">
        <div class="flex flex-row gap-1 text-neutral300 items-center">
          <Icon name="uil:github" class="w-5 h-5"></Icon>
          <h1 class="text-md font-bold">We matter Safety and Quality</h1>
        </div>

        <div class="flex flex-row gap-1 text-neutral300 items-center">
          <Icon name="uil:github" class="w-5 h-5"></Icon>
          <h1 class="text-md font-bold">We matter Safety and Quality</h1>
        </div>

        <div class="flex flex-row gap-1 text-neutral300 items-center">
          <Icon name="uil:github" class="w-5 h-5"></Icon>
          <h1 class="text-md font-bold">We matter Safety and Quality</h1>
        </div>
      </div>

      <div class="flex flex-col" v-if="new_product_result?.length > 0">
        <div class="flex items-center px-5">
          <h1 class="text-lg xl:text-xl text-neutral200 font-bold flex-1">
            Trending New arrivals
          </h1>

          <div class="text-md flex items-center gap-2">
            <NuxtLink
              :to="{
                name: 'products-category-name-id-new-release',
                params: {
                  name: route.params.name,
                  id: route.params.id,
                },
              }"
              >Show More</NuxtLink
            >
            <Icon name="ic:round-keyboard-arrow-down" class="w-4 h-4"></Icon>
          </div>
        </div>

        <div
          class="flex flex-row gap-3 overflow-x-auto py-6 px-5 items-start justify-start max-w-[100vw]"
        >
          <ProductTertiaryCard
            v-for="product in new_product_result"
            :key="product.id"
            :id="product.id"
            :type="Type.REALTIME"
            class="min-w-[13rem]"
            :title="product.title"
            :price="product.selling_price"
            :status="product.status"
            :image="product.logo"
          ></ProductTertiaryCard>
        </div>
      </div>

      <div class="flex flex-col" v-if="top_rated_product?.length > 0">
        <div class="flex items-center px-5">
          <h1 class="text-lg xl:text-xl text-neutral200 font-bold flex-1">
            Top Rated
          </h1>
        </div>

        <div class="flex flex-row gap-3 overflow-x-auto py-6 px-5">
          <ProductSecondaryCard
            v-for="product in top_rated_product"
            :key="product.id"
            class="min-w-[13rem]"
            :type="Type.REALTIME"
            :id="product.id"
            :title="product.title"
            :price="product.selling_price"
            :quantity="product.quantity"
            :status="product.status"
            :score="product.average_rate"
            :image="product.logo"
          ></ProductSecondaryCard>
        </div>
      </div>

      <div class="px-5">
        <h-banner></h-banner>
      </div>

      <div
        class="flex flex-col"
        v-if="special_discount_product_result?.length > 0"
      >
        <div class="flex items-center px-5">
          <h1 class="text-lg xl:text-xl text-neutral200 font-bold flex-1">
            Discount to Deals
          </h1>

          <div class="text-md flex items-center">
            <NuxtLink
              :to="{
                name: 'products-category-name-id-special-discount',
                params: {
                  name: route.params.name,
                  id: route.params.id,
                },
              }"
              >Show More</NuxtLink
            >
            <Icon name="ic:round-keyboard-arrow-down" class="w-4 h-4"></Icon>
          </div>
        </div>

        <div class="flex flex-row gap-3 overflow-x-auto py-6 px-5">
          <ProductTertiaryCard
            v-for="product in special_discount_product_result"
            :key="product.id"
            class="min-w-[13rem]"
            :id="product.id"
            :type="Type.REALTIME"
            :title="product.title"
            :price="product.unit_price - product.discount"
            :status="product.status"
            :discount="product.product_discount.rate"
            :image="product.logo"
          />
        </div>
      </div>

      <div class="flex flex-col">
        <div class="flex items-center px-5">
          <h1 class="text-lg xl:text-xl text-neutral200 font-bold flex-1">
            Just For You
          </h1>

          <div class="text-md flex items-center">
            <NuxtLink
              :to="{
                name: 'products-category-name-id-sub-category-sub_name-sub_id',
                params: {
                  name: subCategory,
                  id: 1,
                  sub_name: 'recommended',
                  sub_id: 1,
                },
              }"
              >Show More</NuxtLink
            >
            <Icon name="ic:round-keyboard-arrow-down" class="w-4 h-4"></Icon>
          </div>
        </div>

        <div class="flex flex-row gap-3 overflow-x-auto py-6 px-5">
          <ProductSecondaryCard
            v-for="product in recommended"
            :key="product.id"
            :id="product.id"
            :type="Type.REALTIME"
            class="min-w-[13rem]"
            :title="product.title"
            :price="product.selling_price"
            :quantity="product.quantity"
            :status="product.status"
            :score="product.average_rate"
            :image="product.logo"
          />
        </div>
      </div>
    </section>
  </section>
</template>
<script setup lang="ts">
import new_arrival_product_for_specific_category from "~/apollo/query/product/realtime/fetch_product.gql";
import { useStore } from "~/store/data";
const store = useStore();
const { locale } = useI18n();
const router = useRouter();
const route = useRoute();
const open = ref(false);
const params = ref<any>(route?.params);
const subCategory = computed(
  () => params.value?.Sub_name || "sub_category-name"
);

enum Type {
  REALTIME,
  VIRTUAL,
}
const timestamp = Date.now();
const date = new Date(timestamp);
date.setDate(date.getDate() - 30);
const new_release_variable = computed(() => {
  return {
    limit: 10,
    offset: 0,
    where: {
      release_status: { _eq: "verified" },
      created_at: { _gte: date },
      physical_product_sub_category: {
        category_id: { _eq: route?.params?.id },
      },
    },
    order_by: {
      created_at: "desc",
    },
  };
});
const top_rated_variable = computed(() => {
  return {
    limit: 10,
    offset: 0,
    where: {
      release_status: { _eq: "verified" },
      average_rate: { _gte: 1 },
      physical_product_sub_category: {
        category_id: { _eq: route?.params?.id },
      },
    },
    order_by: {
      average_rate: "desc_nulls_last",
    },
  };
});

const special_discount_variable = computed(() => {
  return {
    limit: 10,
    where: {
      release_status: { _eq: "verified" },
      product_discount: {
        rate: { _gte: 0 },
      },
      physical_product_sub_category: {
        category_id: { _eq: route?.params?.id },
      },
    },
  };
});

const {
  result: new_release_result,
  error: new_release_error,
  loading: new_product_loading,
} = useCustomQuery(
  new_arrival_product_for_specific_category,
  new_release_variable
);
const {
  result: top_rated_result,
  error: top_rated_error,
  loading: top_rated_loading,
} = useCustomQuery(
  new_arrival_product_for_specific_category,
  top_rated_variable
);
const {
  result: special_discount_product,
  error: special_discount_perror,
  loading: special_discount_ploading,
} = useCustomQuery(
  new_arrival_product_for_specific_category,
  special_discount_variable
);

const new_product_result = computed(() => {
  return new_release_result.value?.product || [];
});

const top_rated_product = computed(() => {
  return top_rated_result.value?.product || [];
});

const recommended = computed(() => {
  const rcmd: any = [];
  new_product_result.value?.forEach((product: any) => {
    if (product?.id % 2 == 0 && rcmd.length < 7) {
      rcmd.push(product);
    }
  });
  top_rated_product.value?.forEach((product: any) => {
    if (product?.id % 2 == 1 && rcmd.length < 14) {
      rcmd.push(product);
    }
  });
  return rcmd;
});

const special_discount_product_result = computed(() => {
  return special_discount_product.value?.product || [];
});

const allCategory = computed(() => {
  return store.getPhysicalProductCategory(locale.value).map((category) => {
    return {
      name: category?.name[0]?.name,
      id: category?.id,
      subCategory: store
        .getPhysicalProductSubCategoryByCategory(locale.value, category.id)
        .map((element) => {
          return {
            name: element?.name[0].name,
            id: element?.id,
          };
        }),
    };
  });
});

const getSubCategory = computed(() => {
  return store
    .getPhysicalProductSubCategoryByCategory(locale.value, route?.params?.id)
    .map((element) => {
      return {
        id: element?.id,
        logo: element?.logo,
        name: element?.name[0].name,
        category_id: element?.category_id,
      };
    });
});

// const getCategory = computed(() => {
//   return store.getPhysicalProductCategory(locale.value).map((element) => {
//     return {
//       name: element?.name[0]?.name,
//       id: element?.id,
//       logo: element?.logo,
//     };
//   });
// });

const select_category_handler = (value) => {
  router.push({
    name: "products-category-name-id",
    params: { id: value?.id, name: value?.name },
  });
};
const select_sub_category_handler = (value) => {
  router.push({
    name: "products-category-name-id-sub-category-sub_name-sub_id",
    params: {
      sub_id: value?.id,
      sub_name: value?.name,
      name: route?.params?.name,
      id: route?.params?.id,
    },
  });
};
</script>

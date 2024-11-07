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
          :all-category="for_dropdown"
          @select:category="select_category_handler"
          class="absolute top-0 left-0 z-30"
          v-model="open"
        />
      </div>
      <div
        class="flex-1 w-full flex xl:flex-nowrap flex-wrap items-center overflow-x-auto gap-6"
      >
        <NuxtLink
          v-for="category in getCategory"
          :key="category.id"
          :to="{
            name: 'products-virtual-category-name-id',
            params: { name: category.name, id: category.id },
          }"
          class="flex-1 flex items-center min-w-fit gap-3 2xl:text-base text-md font-semibold text-dark100"
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
          <p>{{ category.name }}</p>
        </NuxtLink>
      </div>
    </nav>

    <section class="max-w-[90rem] mx-auto w-full flex flex-col gap-6">
      <div
        class="flex flex-row justify-between text-neutral200 font-semibold items-center xg:px-24 lg:px-16 px-5"
      >
        <h1>Elegant Solutions</h1>
        <h1>Reach Services</h1>
        <h2>On Demand and On Time</h2>
      </div>
      <div v-if="new_product_loading">
        <h-skeleton-loader />
      </div>
      <div
        class="flex flex-col"
        v-if="!new_product_loading && new_products?.length > 0"
      >
        <div class="flex items-center px-5">
          <h1 class="text-lg xl:text-xl text-neutral200 font-bold flex-1">
            New arrivals
          </h1>

          <div class="text-md flex items-center gap-2">
            <NuxtLink
              :to="{
                name: 'products-virtual-category-name-id',
                params: { name: 'new_arrivals', id: 1 },
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
            v-for="product in new_products"
            :key="product.id"
            :id="product.id"
            :type="Type.VIRTUAL"
            class="min-w-[18rem]"
            :title="product.title"
            :price="product.unit_price"
            :image="product.cover_image"
          ></ProductTertiaryCard>
        </div>
      </div>
      <div v-if="top_rated_product_loading">
        <h-skeleton-loader />
      </div>
      <div
        class="flex flex-col"
        v-if="!top_rated_product_loading && top_rated_product?.length > 0"
      >
        <div class="flex items-center px-5">
          <h1 class="text-lg xl:text-xl text-neutral200 font-bold flex-1">
            Top Ranking
          </h1>
        </div>

        <div class="flex flex-row gap-3 overflow-x-auto py-6 px-5">
          <ProductSecondaryCard
            v-for="product in top_rated_product"
            :key="product.id"
            :id="product.id"
            :type="Type.VIRTUAL"
            class="min-w-fit"
            :title="product.title"
            :price="product.unit_price"
            :score="product?.average_rate || 0"
            :image="product.cover_image"
          >
          </ProductSecondaryCard>
        </div>
      </div>

      <div class="px-5">
        <h-banner></h-banner>
      </div>

      <div class="flex flex-col">
        <div class="flex items-center px-5">
          <h1 class="text-lg xl:text-xl text-neutral200 font-bold flex-1">
            Just For You
          </h1>

          <div class="text-md flex items-center">
            <NuxtLink
              :to="{
                name: 'products-virtual-category-name-id',
                params: { name: 'recommended', id: 1 },
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
            :type="Type.VIRTUAL"
            class="min-w-[13rem]"
            :title="product.title"
            :price="product.unit_price"
            :score="product.average_rate"
            :image="product.cover_image"
          />
        </div>
      </div>
    </section>
  </section>
</template>

<script setup lang="ts">
import digital_product from "~/apollo/query/product/virtual/product.gql";
import { useStore } from "~/store/data";
const store = useStore();
const route = useRoute();
const router = useRouter();
const { locale } = useI18n();
const open = ref(false);
const timestamp = Date.now();
const date = new Date(timestamp);
date.setDate(date.getDate() - 30);
enum Type {
  REALTIME,

  VIRTUAL,
}

const new_release_variable = computed(() => {
  return {
    limit: 10,
    offset: 0,
    where: {
      created_at: { _gte: date },
      release_status: { _eq: "verified" },
    },
    order_by: {
      created_at: "asc",
    },
  };
});

const top_rated_variable = computed(() => {
  return {
    limit: 10,
    offset: 0,
    where: {
      average_rate: { _gte: 1 },
      release_status: { _eq: "verified" },
    },
    order_by: {
      average_rate: "desc_nulls_last",
    },
  };
});

const {
  error: new_product_error,
  result: new_product_result,
  loading: new_product_loading,
} = useCustomQuery(digital_product, new_release_variable);

const {
  error: top_rated_product_error,
  result: tp_rated_product_result,
  loading: top_rated_product_loading,
} = useCustomQuery(digital_product, top_rated_variable);

const new_products = computed(() => {
  return new_product_result.value?.product;
});

const top_rated_product = computed(() => {
  return tp_rated_product_result.value?.product;
});

const recommended = computed(() => {
  const rcmd: any = [];
  new_products.value?.forEach((product: any) => {
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

const getCategory = computed(() => {
  console.log(store.getVirtualProductCategory(locale.value));

  return store.getVirtualProductCategory(locale.value).map((element: any) => {
    return {
      id: element?.id,
      name: element?.name?.name,
      logo: element?.logo,
    };
  });
});

const for_dropdown = computed(() => {
  return store?.getVirtualProductCategory(locale.value)?.map((element) => {
    return {
      id: element?.id,
      name: element.name?.name,
    };
  });
});

const select_category_handler = (value: any) => {
  router.push({
    name: "products-virtual-category-name-id",
    params: { name: value?.name, id: value?.id },
  });
};
</script>

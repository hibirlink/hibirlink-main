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
          @select:category="select_category_handler"
          @select:sub-category="select_sub_category_handler"
          class="absolute top-0 left-0 z-30"
          v-model="open"
        />
      </div>

      <div
        class="flex-1 w-full flex xl:flex-nowrap flex-wrap items-center overflow-x-auto gap-6"
      >
        <NuxtLink
          v-for="category in physicalProductCategory"
          :key="category.id"
          :to="{
            name: 'products-category-name-id',
            params: { name: category.name[0].name, id: category.id },
          }"
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
          <p>{{ category?.name[0]?.name }}</p>
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

      <div
        v-if="new_release_error && special_discount_perror && top_rated_error"
      >
        <h-error />
      </div>
      <div v-if="new_product_loading">
        <h-skeleton-loader />
      </div>

      <div
        class="flex flex-col"
        v-if="new_product_result && !new_product_loading"
      >
        <div class="flex items-center px-5">
          <h1 class="text-lg xl:text-xl text-neutral200 font-bold flex-1">
            New arrivals
          </h1>

          <!-- <div class="text-md flex items-center gap-2">
            <NuxtLink
              :to="{
                name: 'products-index-new-release-realtime',
                params: {
                  name: 'all',
                  id: 1,
                  sub_name: 'new_arrival',
                  sub_id: 1,
                },
              }"
              >Show More</NuxtLink
            >
            <Icon name="ic:round-keyboard-arrow-down" class="w-4 h-4"></Icon>
          </div> -->
        </div>

        <div
          class="flex flex-row gap-3 overflow-x-auto py-6 px-5 items-start justify-start max-w-[100vw]"
        >
          <ProductTertiaryCard
            v-for="product in new_product_result"
            :key="product.id"
            class="min-w-[18rem]"
            :id="product.id"
            :type="Type.REALTIME"
            :title="product.title"
            :price="product.selling_price"
            :status="product.status"
            :image="product.logo"
          ></ProductTertiaryCard>
        </div>
      </div>
      <div v-if="top_rated_loading">
        <h-skeleton-loader />
      </div>
      <div
        class="flex flex-col"
        v-if="
          !top_rated_loading &&
          top_rated_product &&
          top_rated_product?.length > 0
        "
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
            :type="Type.REALTIME"
            class="min-w-fit"
            :title="product.title"
            :price="product.selling_price"
            :quantity="product.quantity"
            :status="product.status"
            :score="product.average_rate"
            :image="product.logo"
          />
        </div>
      </div>
      <div v-if="special_discount_ploading">
        <h-skeleton-loader />
      </div>
      <div class="flex flex-col" v-if="!special_discount_ploading">
        <div class="flex items-center px-5">
          <h1 class="text-lg xl:text-xl text-neutral200 font-bold flex-1">
            Discount Products
          </h1>

          <div class="text-md flex items-center">
            <NuxtLink
              :to="{
                name: 'products-index-special-discount-realtime',
              }"
              >Show More</NuxtLink
            >
            <Icon name="ic:round-keyboard-arrow-down" class="w-4 h-4"></Icon>
          </div>
        </div>

        <div class="flex flex-row gap-3 overflow-x-auto py-6 px-5">
          <ProductTertiaryCard
            v-for="with_discount in special_discount_product_result"
            :key="with_discount.id"
            :type="Type.REALTIME"
            class="min-w-[13rem]"
            :id="with_discount.id"
            :title="with_discount.title"
            :price="with_discount.selling_price"
            :status="with_discount.status"
            :discount="with_discount?.product_discount?.rate"
            :image="with_discount.logo"
          />
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
                name: 'products-category-name-id-sub-category-sub_name-sub_id',
                params: {
                  name: 'all',
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
import new_arrival_product from "~/apollo/query/product/realtime/fetch_product.gql";
import { useStore } from "~/store/data";
const open = ref(false);
const selected_category = ref();

const store = useStore();
const route = useRoute();
const router = useRouter();
const { locale } = useI18n();
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
      release_status: { _eq: "verified" },

      created_at: { _gte: date },
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
      release_status: { _eq: "verified" },

      average_rate: { _gte: 1 },
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
      product_discount: {
        rate: { _gte: 0 },
        start_date: { _lte: new Date().toLocaleDateString() },
        end_date: { _gte: new Date().toLocaleDateString() },
      },
    },
  };
});

const {
  result: new_release_result,
  error: new_release_error,
  loading: new_product_loading,
} = useCustomQuery(new_arrival_product, new_release_variable);
const {
  result: top_rated_result,
  error: top_rated_error,
  loading: top_rated_loading,
} = useCustomQuery(new_arrival_product, top_rated_variable);
const {
  result: special_discount_product,
  error: special_discount_perror,
  loading: special_discount_ploading,
} = useCustomQuery(new_arrival_product, special_discount_variable);
const physicalProductCategory = computed(() => {
  return store?.getPhysicalProductCategory(locale.value);
});

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

const select_category_handler = (value) => {
  router.push({
    name: "products-category-name-id",
    params: { id: value?.id, name: value?.name },
  });
};

const select_sub_category_handler = (value) => {
  const category_of = store
    ?.getPhysicalProductSubCategory(locale.value)
    .find((element) => {
      return element?.id == value?.id;
    });

  const category_name = store
    ?.getPhysicalProductCategory(locale.value)
    .find((element) => {
      return element.id == category_of?.category_id;
    })?.name;

  router.push({
    name: "products-category-name-id-sub-category-sub_name-sub_id",
    params: {
      sub_id: value?.id,
      sub_name: value?.name,
      name: category_name[0].name,
      id: category_of?.category_id,
    },
  });
};
</script>

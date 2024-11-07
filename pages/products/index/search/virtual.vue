<template>
  <main
    class="flex relative flex-col gap-5 items-center w-full justify-center z-0 h-full"
  >
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
          :class="[
            category.id == route.params?.id ? 'text-primary' : 'text-dark100',
          ]"
          class="flex-1 flex items-center min-w-fit gap-3 2xl:text-base text-md font-semibold"
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
    <section class="max-w-[90rem] mx-auto w-full space-y-6 px-5">
      <div class="my-10 flex gap-5 relative">
        <div class="max-w-[13rem] w-full">
          <div class="flex flex-col gap-3 text-neutral200 w-full">
            <h1 class="text-lg font-bold">Filter</h1>

            <h1 class="font-semibold px-2">Review</h1>

            <div
              class="flex gap-3 items-center px-5 text-sm cursor-pointer"
              :class="[rate === r ? 'bg-primaryvar5' : '']"
              @click="rate = r"
              v-for="r in [5, 4, 3, 2, 1]"
              :key="r"
            >
              <h-rating :readonly="true" :rate-value="r"></h-rating>
              <span v-if="r !== 5" :class="[rate === r ? 'text-primary' : '']"
                >& up</span
              >
            </div>
          </div>
        </div>

        <div class="flex flex-col w-full">
          <div
            class="flex gap-2 ml-auto items-center mb-4 justify-between w-full"
          >
            <div
              class="px-6 py-1 bg-light200 rounded-full hover:bg-red/30 text-red space-x-2 cursor-pointer"
              :class="[rate ? 'visible' : 'invisible']"
              @click="rate = null"
            >
              Clear Filter
              <Icon name="ic:round-clear" class="w-5 h-5 text-red" />
            </div>
            <Icon
              @click="
                listType == ListType.GRID
                  ? (listType = ListType.LIST)
                  : (listType = ListType.GRID)
              "
              :name="
                listType == ListType.GRID
                  ? 'material-symbols:view-list'
                  : 'material-symbols:grid-on-sharp'
              "
              class="w-5 h-5 cursor-pointer"
            />
          </div>
          <h-banner></h-banner>
          <div v-if="product_loading">
            <h-skeleton-loader />
          </div>

          <div v-if="product_error">
            <h-error />
          </div>

          <div
            v-if="listType === ListType.GRID && !product_loading"
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4"
          >
            <ProductPrimaryGridCard
              v-for="product in products"
              :key="product.id"
              :id="product.id"
              :type="Type.VIRTUAL"
              :title="product.title"
              :price="product.unit_price"
              :score="product.average_rate || 0"
              :supplier="
                product?.supplier.userById.first_name +
                ' ' +
                product?.supplier.userById.last_name
              "
              :image="product.cover_image"
            />
          </div>
          <div
            v-if="!product_loading && products?.length <= 0"
            class="flex w-full justify-center"
          >
            <h-search-not-found />
          </div>

          <div
            v-else-if="listType === ListType.LIST && !product_loading"
            class="flex flex-col gap-5 mt-5 w-[100%]"
          >
            <ProductPrimaryListCard
              class="w-full"
              v-for="product in products"
              :key="product.id"
              :id="product.id"
              :type="Type.VIRTUAL"
              :title="product.title"
              :price="product.unit_price"
              :score="product.average_rate || 0"
              :supplier="
                product?.supplier.userById.first_name +
                ' ' +
                product?.supplier.userById.last_name
              "
              :image="product.cover_image"
            />
          </div>

          <h-pagination
            class="my-5"
            :items-per-page="limit"
            :total-data="total_product"
            @update:offset="updateOffset"
          ></h-pagination>
        </div>
      </div>
    </section>
  </main>
</template>

<script lang="ts" setup>
import digital_product from "~/apollo/query/product/virtual/product.gql";
import { useStore } from "~/store/data";
const store = useStore();
const route = useRoute();
const router = useRouter();
const { locale } = useI18n();
const open = ref(false);
const rate = ref();
const offset = ref(0);
const limit = ref(10);
enum ListType {
  GRID,
  LIST,
}
enum Type {
  REALTIME,
  VIRTUAL,
}

const variable = computed(() => {
  return {
    limit: limit.value,
    offset: offset.value,
    where: {
      ...(route?.query?.name
        ? {
            title: {
              _iregex: route?.query?.name?.replace(
                /[.+*?^${}()|[\]\\]/g,
                "\\$&"
              ),
            },
          }
        : {}),

      ...(rate.value ? { average_rate: { _gte: rate.value } } : {}),
      category_id: { _eq: route.params.id },
      release_status: { _eq: "verified" },
    },
    order_by: {
      average_rate: "asc_nulls_last",
    },
  };
});

const {
  error: product_error,
  result: product_result,
  loading: product_loading,
} = useCustomQuery(digital_product, variable);

const products = computed(() => {
  return product_result.value?.product;
});

const total_product = computed(() => {
  return product_result.value?.total?.product?.value;
});
const listType = ref(ListType.GRID);

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

const updateOffset = (value: any) => {
  offset.value = value;
};

useHead({
  title: "Products",
});

definePageMeta({
  layout: "custom",
});
</script>

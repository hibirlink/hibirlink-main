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
      <!-- <div
        class="flex-1 w-full flex xl:flex-nowrap flex-wrap items-center overflow-x-auto gap-6"
      >
        <NuxtLink
          v-for="category in getSubCategory"
          :key="category.id"
          :to="{
            name: 'products-category-name-id-sub-category-sub_name-sub_id',
            params: {
              sub_name: category.name,
              sub_id: category.id,
            },
          }"
          class="flex-1 flex items-center min-w-fit gap-3 2xl:text-base text-md font-semibold"
          :class="[
            route?.params?.sub_id == category?.id
              ? 'text-primary'
              : 'text-dark100',
          ]"
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
        </NuxtLink>
      </div> -->
    </nav>

    <section class="max-w-[90rem] mx-auto w-full flex flex-col gap-6">
      <div class="my-10 flex gap-5 relative">
        <div class="max-w-[13rem] w-full">
          <div class="flex flex-col gap-3 text-neutral200 w-full">
            <h1 class="text-lg font-bold">Filter</h1>

            <h1 class="font-semibold px-2">Status</h1>

            <div class="flex gap-3 items-center px-5 text-sm">
              <input
                id="new"
                type="radio"
                value="new"
                v-model="status"
                class="appearance-none w-4 h-4 checked:ring-1 accent-primary ring-offset-2 rounded-[0.2rem] text-light150 border-primary border-1 active:bg-primary focus:ring-primary focus:text-primary checked:text-primary cursor-pointer"
              />
              <label for="new">New</label>
            </div>
            <div class="flex gap-3 items-center px-5 text-sm">
              <input
                id="slightlyUsed"
                value="slightly used"
                type="radio"
                v-model="status"
                class="appearance-none w-4 h-4 checked:ring-1 accent-primary ring-offset-2 rounded-[0.2rem] text-light150 border-primary border-1 active:bg-primary focus:ring-primary focus:text-primary checked:text-primary cursor-pointer"
              />
              <label for="slightlyUsed">Slightly Used</label>
            </div>

            <div class="flex gap-3 items-center px-5 text-sm">
              <input
                id="used"
                type="radio"
                value="used"
                v-model="status"
                class="appearance-none w-4 h-4 checked:ring-1 accent-primary ring-offset-2 rounded-[0.2rem] text-light150 border-primary border-1 active:bg-primary focus:ring-primary focus:text-primary checked:text-primary cursor-pointer"
              />
              <label for="used">Used</label>
            </div>

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

            <h1 class="font-semibold px-2">Price</h1>
            <div
              class="flex gap-3 px-5 text-sm w-full items-center justify-center"
            >
              <h-text-field
                name="price"
                leading-text="ETB"
                type="number"
                label="Up To"
                v-model="price"
              />
            </div>

            <h1 class="font-semibold px-2">Location</h1>
            <h-text-field
              type="search"
              name="location_search"
              class="h-[1.7rem]"
              placeholder="search location"
              v-model="search_location"
            />
            <div
              class="flex flex-col gap-4 max-h-[12rem] overflow-y-auto"
              v-if="locations"
            >
              <div
                class="flex gap-3 items-center px-5 text-sm"
                v-for="loc in locations"
                :key="loc"
              >
                <input
                  :id="loc?.id"
                  type="checkbox"
                  name="address"
                  :value="loc?.name[1]?.name"
                  v-model="location"
                  class="appearance-none w-4 h-4 checked:ring-1 accent-primary ring-offset-2 rounded-[0.2rem] text-light150 border-primary border-1 active:bg-primary focus:ring-primary focus:text-primary checked:text-primary cursor-pointer"
                />
                <label :for="loc?.id">{{ loc?.name[1]?.name }}</label>
              </div>
            </div>
          </div>
        </div>

        <div class="flex flex-col w-full">
          <div
            class="flex gap-2 ml-auto items-center mb-4 justify-between w-full"
          >
            <div
              class="px-6 py-1 bg-light200 rounded-full text-red space-x-2 hover:bg-red/20 cursor-pointer"
              :class="[
                location.length > 0 || price || rate || status
                  ? 'visible'
                  : 'invisible',
              ]"
              @click="
                () => {
                  price = undefined;
                  rate = 0;
                  location = [];
                  status = '';
                }
              "
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
          <div v-if="product_fetch_error">
            <h-error />
          </div>
          <div v-if="product_loading">
            <h-skeleton-loader />
          </div>
          <div
            v-if="listType === ListType.GRID && products && !product_loading"
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4"
          >
            <ProductPrimaryGridCard
              v-for="product in products"
              :key="product.id"
              :id="product.id"
              :type="Type.REALTIME"
              :title="product.title"
              :price="product.selling_price"
              :status="product.status"
              :quantity="product.quantity"
              :score="product.average_rate || 0"
              :supplier="
                product.store.supplier.userById.first_name +
                ' ' +
                product.store.supplier.userById.last_name
              "
              :image="product.logo"
            />
          </div>
          <div
            v-if="products && products?.length <= 0 && !product_loading"
            class="flex w-full justify-center items-center"
          >
            <h-search-not-found />
          </div>
          <div
            v-else-if="
              listType === ListType.LIST && products && !product_loading
            "
            class="flex flex-col gap-5 mt-5 w-[100%]"
          >
            <ProductPrimaryListCard
              class="w-full"
              v-for="product in products"
              :key="product.id"
              :id="product.id"
              :type="Type.REALTIME"
              :title="product.title"
              :score="product.average_rate"
              :price="product.selling_price"
              :status="product.status"
              :quantity="product.quantity"
              :supplier="
                product.store.supplier.userById.first_name +
                ' ' +
                product.store.supplier.userById.last_name
              "
              :image="product.logo"
            />
          </div>
        </div>

        <h-pagination
          class="my-5"
          :items-per-page="limit"
          :total-data="total_product"
          @update:offset="updateOffset"
        ></h-pagination>
      </div>

      <div class="flex flex-col gap-6">
        <div class="flex items-center">
          <h1 class="text-lg xl:text-xl text-neutral200 font-bold flex-1">
            Related Products
          </h1>
        </div>

        <div
          class="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4"
        >
          <ProductSecondaryCard
            v-for="i in 5"
            :key="i"
            :id="i"
            :type="Type.REALTIME"
            class="min-w-[13rem]"
            title="product"
            :price="230"
            :quantity="10"
            status="New"
            :score="4.5"
            image="https://randomwordgenerator.com/img/picture-generator/57e0d643425aa814f1dc8460962e33791c3ad6e04e507440712f7bd5904bc1_640.jpg"
          />
        </div>
      </div>
    </section>
  </section>
</template>
<script setup lang="ts">
import product_for_specific_subcategory from "~/apollo/query/product/realtime/fetch_product.gql";
import { useStore } from "~/store/data";
const { locale } = useI18n();
const store = useStore();
const router = useRouter();
const route = useRoute();
const status = ref("");
const rate = ref(0);
const price = ref();
const location = ref([]);
const offset = ref(0);
const limit = ref(10);
const open = ref(false);
const search_location = ref("");
enum ListType {
  GRID,
  LIST,
}
enum Type {
  REALTIME,
  VIRTUAL,
}

watchEffect(() => {
  console.log(route.query);
});

const listType = ref(ListType.GRID);

const category_id = computed(() => {
  return route.params?.id;
});

const getSubCategory = computed(() => {
  return store
    .getPhysicalProductSubCategoryByCategory(locale.value, category_id.value)
    .map((element) => {
      return {
        id: element?.id,
        logo: element?.logo,
        name: element?.name[0].name,
      };
    });
});

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

      release_status: { _eq: "verified" },

      ...(rate.value ? { average_rate: { _gte: rate.value } } : {}),
      ...(location.value.length > 0
        ? {
            store: {
              sub_city: {
                _or: [
                  {
                    original_language: {
                      translation_contents: {
                        name: { _in: location.value },
                      },
                    },
                  },
                  {
                    region_city: {
                      original_language: {
                        translation_contents: {
                          name: { _in: location.value },
                        },
                      },
                    },
                  },
                ],
              },
            },
          }
        : {}),
      ...(price.value ? { selling_price: { _gte: price.value } } : {}),
      ...(status.value ? { status: { _eq: status.value } } : {}),
    },
  };
});

const locations = computed(() => {
  let subcity = store?.$state?.sub_city;
  let region = store?.$state?.region_city;

  if (subcity && region) {
    let region_and_sub_city = [...subcity, ...region];
    return region_and_sub_city.filter((value) => {
      return value?.name[1]?.name
        ?.toUpperCase()
        ?.includes(search_location.value.toUpperCase().trim());
    });
  }
  return [];
});

const {
  result: product_result,
  error: product_fetch_error,
  loading: product_loading,
} = useCustomQuery(product_for_specific_subcategory, variable);

const products = computed(() => {
  return product_result.value?.product || [];
});

watch(
  [rate, price, location, status],
  ([newRate, newPrice, newLocation, newStatus]) => {
    offset.value = 0;
  }
);

const total_product = computed(() => {
  return product_result.value?.total?.product?.value;
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

const updateOffset = (value) => {
  offset.value = value;
};
</script>

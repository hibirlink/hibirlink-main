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
        {{ route?.params }}
      </h1>

      <h-bread-crumb class="w-fit"></h-bread-crumb>
    </div>

    <div class="max-w-3xl w-full px-[5%] h-[2rem]"></div>

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
          :all-category="for_dropdown_service_category"
          @select:category="select_category_handler"
          class="absolute top-0 left-0 z-30"
          v-model="open"
        />
      </div>
      <div
        v-if="store.getVirtualServiceCategory(locale)"
        class="flex-1 w-full flex xl:flex-nowrap flex-wrap items-center overflow-x-auto gap-6"
      >
        <NuxtLink
          v-for="category in store.getVirtualServiceCategory(locale)"
          :key="category.id"
          :to="{
            name: 'services-virtual-category-name-id',
            params: { name: category.name[0].name, id: category.id },
          }"
          class="flex-1 flex items-center min-w-fit gap-3 2xl:text-base text-md font-semibold"
          :class="[
            route.params.id == category.id ? 'text-primary' : 'text-dark100',
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
          <p>{{ category.name[0].name }}</p>
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
              :class="[r === rate ? 'bg-primaryvar6 text-primary' : '']"
              v-for="r in [5, 4, 3, 2, 1]"
              @click="rate = r"
              :key="r"
            >
              <h-rating :readonly="true" :rate-value="r"></h-rating>
              <span v-if="r !== 5" class="text-sm">&& up</span>
            </div>
          </div>
        </div>

        <div class="flex flex-col w-full">
          <div
            class="flex gap-2 ml-auto items-center mb-4 justify-between w-full"
          >
            <div
              :class="[rate ? 'visible' : 'invisible']"
              @click="rate = null"
              class="px-6 py-1 bg-light200 rounded-full text-red space-x-2"
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
          <div v-if="service_loading">
            <h-skeleton-loader />
          </div>

          <div v-if="service_error" class="py-4">
            <h-error />
          </div>
          <div
            v-if="listType === ListType.GRID && services && !service_loading"
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4"
          >
            <div
              v-if="services?.length <= 0"
              class="w-full justify-center col-span-4 items-center py-4 flex"
            >
              <h-search-not-found />
            </div>
            <ServicePrimaryGridCard
              class=""
              v-for="service in services"
              :key="service.id"
              :id="service.id"
              :type="Type.VIRTUAL"
              :title="service.title"
              :supplier="
                service.supplier.userById.first_name +
                ' ' +
                service.supplier.userById.last_name
              "
              :images="groupImages(service.logo, service.medias)"
              :licensed="service.license != null"
              :score="service.average_rate || 0"
              :autoplay="false"
            />
          </div>

          <div
            v-else-if="
              listType === ListType.LIST && services && !service_loading
            "
            class="flex flex-col gap-5 mt-5 w-[100%]"
          >
            <div
              v-if="services?.length <= 0"
              class="w-full justify-center col-span-4 items-center py-4 flex"
            >
              <h-search-not-found />
            </div>
            <ServicePrimaryListCard
              class="w-full"
              v-for="service in services"
              :key="service.id"
              :title="service.title"
              :id="service.id"
              :type="Type.VIRTUAL"
              :licensed="service.license != null"
              :score="service.average_rate"
              :supplier="
                service.supplier?.userById.first_name +
                ' ' +
                service.supplier?.userById.last_name
              "
              :images="groupImages(service.logo, service.medias)"
            />
          </div>

          <h-pagination
            v-if="total_service"
            class="my-5"
            :items-per-page="limit"
            :total-data="total_service"
          ></h-pagination>
        </div>
      </div>
    </section>
  </main>
</template>

<script lang="ts" setup>
import virtual_service from "~/apollo/query/service/virtual/fetch_service.gql";
import { useStore } from "~/store/data";
const limit = ref(10);
const offset = ref(0);
const rate = ref(null);
const { locale } = useI18n();
const store = useStore();
const route = useRoute();
const router = useRouter();
const open = ref(false);
const name = computed(() => {
  return route.params?.name;
});
const variable = computed(() => {
  return {
    limit: limit.value,
    offset: offset.value,
    where: {
      release_status: { _eq: "verified" },
      ...(name?.value
        ? {
            title: {
              _iregex: name?.value?.replace(/[.+*?^${}()|[\]\\]/g, "\\$&"),
            },
          }
        : {}),
      ...(rate.value
        ? {
            average_rate: {
              _gte: rate.value,
            },
          }
        : {}),
    },
    order_by: {
      average_rate: "asc_nulls_last",
    },
  };
});
enum ListType {
  GRID,
  LIST,
}
enum Type {
  REALTIME,
  VIRTUAL,
}
const listType = ref(ListType.GRID);

watch(rate, (newValue) => {
  offset.value = 0;
});

const {
  error: service_error,
  result: service_result,
  loading: service_loading,
} = useCustomQuery(virtual_service, variable);

const services = computed(() => {
  return service_result.value?.service;
});

const total_service = computed(() => {
  return service_result.value?.total?.service?.value;
});

const select_category_handler = (value) => {
  router.push({
    name: "services-virtual-category-name-id",
    params: { name: value.name, id: value.id },
  });
};

const for_dropdown_service_category = computed(() => {
  return store.getVirtualServiceCategory(locale.value).map((element) => {
    return {
      name: element.name[0]?.name,
      id: element?.id,
    };
  });
});

useHead({
  title: "Products",
});

definePageMeta({
  layout: "custom",
});
</script>

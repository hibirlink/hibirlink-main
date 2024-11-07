<template>
  <section class="w-full flex flex-col gap-6">
    <nav
      class="w-full xl:h-14 h-fit p-3 bg-light300 rounded-md flex gap-6 justify-start items-start"
    >
      <div
        class="flex relative items-center gap-2 2xl:text-base text-md font-semibold"
      >
        <Icon name="icon-park-solid:all-application" class="w-5 h-5" />
        <span @mouseenter="open = true">All</span>
        <h-nested-dropdown
          :all-category="virtual_service_category"
          @select:category="select_category_handler"
          class="absolute top-0 left-0 z-30"
          v-model="open"
        />
      </div>
      <div
        class="flex-1 w-full flex xl:flex-nowrap flex-wrap items-center overflow-x-auto gap-6"
      >
        <NuxtLink
          v-for="category in service_category"
          :key="category.id"
          :to="{
            name: 'services-virtual-category-name-id',
            params: { name: category?.name[0]?.name, id: category.id },
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

      <div v-if="new_release_loading">
        <h-skeleton-loader />
      </div>

      <div
        class="flex flex-col"
        v-if="!new_release_loading && new_release_service?.length > 0"
      >
        <div class="flex items-center px-5">
          <h1 class="text-lg xl:text-xl text-neutral200 font-bold flex-1">
            New Services
          </h1>
        </div>

        <div
          class="flex flex-row gap-3 overflow-x-auto py-6 px-5 items-start justify-start max-w-sm"
        >
          <ServiceTertiaryCard
            v-for="service in new_release_service"
            :key="service.id"
            :id="service.id"
            :licensed="service.license != null"
            :type="Type.VIRTUAL"
            :description="getDescription(service.description.ops)"
            class="min-w-[20rem]"
            :title="service.title"
            :images="
              service.medias
                ? groupImages(service.logo, service.medias)
                : [{ content: service.logo, type: 'image' }]
            "
          />
        </div>
      </div>
      <div v-if="top_rated_loading">
        <h-skeleton-loader />
      </div>

      <div
        class="flex flex-col"
        v-if="!top_rated_loading && top_rated_service?.length > 0"
      >
        <div class="flex items-center px-5">
          <h1 class="text-lg xl:text-xl text-neutral200 font-bold flex-1">
            Top Ranking
          </h1>
        </div>

        <div class="flex flex-row gap-3 overflow-x-auto py-6 px-5">
          <ServiceSecondaryCard
            v-for="service in top_rated_service"
            :key="service.id"
            :id="service.id"
            :type="Type.VIRTUAL"
            class="min-w-[13rem]"
            :title="service.title"
            :licensed="service.license != null"
            :score="service.average_rate"
            :image="service.logo"
          />
        </div>
      </div>

      <div class="px-5">
        <h-banner title="Virtual Services"></h-banner>
      </div>

      <div class="flex flex-col">
        <div class="flex items-center px-5">
          <h1 class="text-lg xl:text-xl text-neutral200 font-bold flex-1">
            Just For You
          </h1>

          <div class="text-md flex items-center gap-2">
            <NuxtLink
              :to="{
                name: 'services-category-name-id',
                params: { name: 'recommended', id: 1 },
              }"
              >Show More</NuxtLink
            >
            <Icon name="ic:round-keyboard-arrow-down" class="w-4 h-4"></Icon>
          </div>
        </div>

        <div
          class="flex flex-row gap-3 overflow-x-auto py-6 px-5 items-start justify-start max-w-[100vw]"
        >
          <ServiceTertiaryCard
            v-for="service in recommended"
            :key="service.id"
            :id="service.id"
            :type="Type.REALTIME"
            :licensed="service.license != null"
            :description="getDescription(service.description.ops)"
            class="min-w-[20rem]"
            :title="service.title"
            :images="groupImages(service.logo, service.medias)"
          />
        </div>
      </div>
    </section>
  </section>
</template>

<script setup lang="ts">
import virtual_service from "~/apollo/query/service/virtual/fetch_service.gql";
import { useStore } from "~/store/data";

const { locale } = useI18n();
const store = useStore();
const router = useRouter();
const route = useRoute();
const timestamp = Date.now();
const date = new Date(timestamp);
date.setDate(date.getDate() - 30);
const open = ref(false);

enum Type {
  REALTIME,
  VIRTUAL,
}

const top_rated_variable = computed(() => {
  return {
    limit: 10,
    where: {
      release_status: { _eq: "verified" },

      average_rate: { _gte: 1 },
    },
    order_by: {
      average_rate: "asc_nulls_last",
    },
  };
});

const new_release_variable = computed(() => {
  return {
    limit: 10,
    where: {
      release_status: { _eq: "verified" },
      created_at: {
        _gte: date,
      },
    },
    order_by: {
      created_at: "asc_nulls_last",
    },
  };
});

const {
  error: new_release_error,
  result: new_release_result,
  loading: new_release_loading,
} = useCustomQuery(virtual_service, new_release_variable);

const {
  error: top_rated_error,
  result: top_rated_result,
  loading: top_rated_loading,
} = useCustomQuery(virtual_service, top_rated_variable);

const new_release_service = computed(() => {
  return new_release_result.value?.service;
});

const top_rated_service = computed(() => {
  return top_rated_result.value?.service;
});

const recommended = computed(() => {
  const rcmd: any = [];
  new_release_service.value?.forEach((product: any) => {
    if (product?.id % 2 == 0 && rcmd.length < 7) {
      rcmd.push(product);
    }
  });
  top_rated_service.value?.forEach((product: any) => {
    if (product?.id % 2 == 1 && rcmd.length < 14) {
      rcmd.push(product);
    }
  });
  return rcmd;
});

const service_category = computed(() => {
  return store.getVirtualServiceCategory(locale.value);
});

const virtual_service_category = computed(() => {
  return service_category.value?.map((element) => {
    return {
      name: element?.name[0]?.name,
      id: element.id,
    };
  });
});

const select_category_handler = (value) => {
  router.push({
    name: "services-virtual-category-name-id",
    params: { name: value.name, id: value.id },
  });
};
</script>

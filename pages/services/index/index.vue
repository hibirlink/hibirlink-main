<template>
  <section class="w-full flex flex-col gap-6">
    <nav
      class="w-full xl:h-14 h-fit p-3 bg-light300 rounded-md flex gap-6 justify-start items-start"
    >
      <div
        class="flex items-center relative gap-2 2xl:text-base text-md font-semibold"
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
        v-if="service_categories"
        class="flex-1 w-full flex xl:flex-nowrap flex-wrap items-center overflow-x-auto gap-6"
      >
        <NuxtLink
          v-for="category in service_categories"
          :key="category.id"
          :to="{
            name: 'services-category-name-id',
            params: { name: category.name?.[0]?.name, id: category.id },
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

      <div class="flex flex-col">
        <div
          class="flex items-center px-5"
          v-if="new_release_service && new_release_service.length > 0"
        >
          <h1 class="text-lg xl:text-xl text-neutral200 font-bold flex-1">
            New Services
          </h1>

          <div class="text-md flex items-center gap-2">
            <NuxtLink
              :to="{
                name: 'services-new-release-realtime',
              }"
              >Show More</NuxtLink
            >
            <Icon name="ic:round-keyboard-arrow-down" class="w-4 h-4"></Icon>
          </div>
        </div>
        <div
          class="w-full text-sm font-semibold text-red"
          v-if="new_release_error"
        >
          {{ new_release_error }}
        </div>

        <div
          class="flex flex-row gap-3 overflow-x-auto py-6 px-5 items-start justify-start max-w-sm"
          v-if="new_release_service"
        >
          <ServiceTertiaryCard
            v-for="service in new_release_service"
            :id="service.id"
            :type="Type.REALTIME"
            :licensed="service.license != null"
            :description="getDescription(service.description.ops)"
            class="min-w-[20rem]"
            :title="service.title"
            :images="groupImages(service.logo, service.medias)"
          ></ServiceTertiaryCard>
        </div>
      </div>

      <div
        v-if="loading_top_rate"
        class="flex flex-row gap-2 w-full overflow-x-auto"
      >
        <h-skeleton-loader> </h-skeleton-loader>
      </div>
      <div class="w-full text-sm font-semibold text-red" v-if="top_rate_error">
        {{ top_rate_error }}
      </div>

      <div
        class="flex flex-col"
        v-if="top_rated_service && top_rated_service.length > 0"
      >
        <div class="flex items-center px-5">
          <h1 class="text-lg xl:text-xl text-neutral200 font-bold flex-1">
            Top Ranking
          </h1>

          <div class="text-md flex items-center">
            <NuxtLink
              :to="{
                name: 'services-top-rated-realtime',
              }"
              >Show More</NuxtLink
            >
            <Icon name="ic:round-keyboard-arrow-down" class="w-4 h-4"></Icon>
          </div>
        </div>

        <div
          v-for="service in top_rated_service"
          class="flex flex-row gap-3 overflow-x-auto py-6 px-5 items-start justify-start max-w-[100vw]"
        >
          <ServiceSecondaryCard
            class="min-w-[13rem]"
            :id="service.id"
            :type="Type.REALTIME"
            :title="service.title"
            :licensed="service.license != null"
            :rate="service.average_rate"
            :score="service.average_rate"
            :availability="{
              days: service.availability.per_week?.length,
              hours: calculateTime(
                service.availability.per_day.start_time,
                service.availability.per_day.end_time
              ),
            }"
            :image="service.logo"
          ></ServiceSecondaryCard>
        </div>
      </div>

      <div class="px-5">
        <h-banner title="Realtime Services"></h-banner>
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
import { useStore } from "~/store/data";
import new_release from "~/apollo/query/service/realtime/new_release.gql";
import top_rate from "~/apollo/query/service/realtime/top_rate.gql";
const { locale } = useI18n();
const timestamp = Date.now();
const router = useRouter();
const date = new Date(timestamp);
date.setDate(date.getDate() - 30);
const limit = ref(10);
const store = useStore();
const open = ref(false);

enum Type {
  REALTIME,
  VIRTUAL,
}

const {
  refetch: refetch_new_release_service,
  error: new_release_error,
  result: new_release_result,
  loading: new_release_loading,
} = useCustomQuery(new_release, {
  where: {
    release_status: { _eq: "verified" },
    created_at: { _gte: date },
  },
});

const {
  error: top_rate_error,
  result: top_rated_result,
  refetch: refetch_top_rated,
  loading: loading_top_rate,
  onError: onFetchTopRatedServiceError,
} = useCustomQuery(top_rate, {
  limit: limit.value,

  where: {
    release_status: { _eq: "verified" },
    average_rate: {
      _gte: 1,
    },
  },
});

const new_release_service = computed(() => {
  return new_release_result.value?.service;
});

const top_rated_service = computed(() => {
  return top_rated_result.value?.service;
});
onFetchTopRatedServiceError((error) => {
  console.log(error);
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

const service_categories = computed(() => {
  return store.getRealTimeServiceCategory(locale.value);
});
const for_dropdown_service_category = computed(() => {
  return service_categories?.value?.map((element) => {
    return {
      name: element.name[0]?.name,
      id: element.id,
    };
  });
});

const select_category_handler = (value) => {
  router.push({
    name: "services-category-name-id",
    params: { name: value.name, id: value.id },
  });
};
</script>

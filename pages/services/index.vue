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
          /^\/services(?!(\/virtual))+/i.test(currentPath)
            ? 'text-light300 border-light300'
            : 'text-dark100 border-dark100'
        "
        class="font-semibold text-light300 border-light300 transition-colors ease-in-out duration-200 border-b-2 px-8 py-1 rounded-sm cursor-pointer hover:border-light100 hover:text-light100 backdrop-blur-sm"
      >
        <NuxtLink :to="{ name: 'services-index' }">
          Realtime Services
        </NuxtLink>
      </div>

      <label
        for="Toggle1"
        class="inline-flex items-center space-x-4 cursor-pointer dark:text-gray-100"
      >
        <span @click="handleServiceType" class="relative">
          <input
            id="Toggle1"
            v-model="isRealtimeService"
            @click="handleServiceType"
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
          /^\/services\/virtual/i.test(currentPath)
            ? 'text-dark100 border-light300'
            : 'text-light300 border-light300'
        "
        class="font-semibold text-light300 border-light300 transition-colors ease-in-out duration-200 border-b-2 px-8 py-1 rounded-sm cursor-pointer hover:border-light100 hover:text-light100 backdrop-blur-sm"
      >
        <NuxtLink :to="{ name: 'services-index-virtual' }">
          Virtual Services
        </NuxtLink>
      </div>
    </div>

    <h-auto-complete
      v-if="!isRealtimeService"
      :data="realtime_Service"
      @update:value="realtime_service_update_handler"
      :categories="realtime_category"
      @select:category="select_service_category"
      @update:data="realtime_specific_service_handler"
      placeholder="Search Physical Service"
      class="max-w-3xl w-full px-[5%]"
    />

    <h-auto-complete
      v-else
      placeholder="Search Virtual Service"
      :categories="virtual_category"
      :data="virtual_service"
      @update:value="virtual_service_update_handler"
      @select:category="select_virtual_category"
      @update:data="virtual_specific_service_handler"
      class="max-w-3xl w-full px-[5%]"
    />
    <section class="h-full w-full">
      <NuxtPage />
    </section>
  </main>
</template>

<script lang="ts" setup>
import { useStore } from "~/store/data";
import fetch_virtual_service from "~/apollo/query/service/virtual/fetch_service.gql";
import fetch_realtime_service from "~/apollo/query/service/realtime/query_service_by_category.gql";
const route = useRoute();
const router = useRouter();
const currentPath = computed(() => route.path);
const store = useStore();
const isRealtimeService = computed(() => {
  return !/^\/services(?!(\/virtual))+/i.test(currentPath.value);
});
const realtime_category_id = ref(null);
const virtual_category_id = ref(null);
const virtual_search_query = ref("");
const realtime_search_service = ref("");
const { locale } = useI18n();

const realtime_service_variable = computed(() => {
  return {
    where: {
      release_status: {
        _eq: "verified",
      },
      ...(realtime_category_id?.value != null &&
      realtime_category_id?.value != "all"
        ? {
            category_id: { _eq: realtime_category_id?.value },
          }
        : {}),
      ...(realtime_search_service?.value
        ? {
            title: {
              _iregex: realtime_search_service?.value?.replace(
                /[.+*?^${}()|[\]\\]/g,
                "\\$&"
              ),
            },
          }
        : {}),
    },
  };
});

const virtual_service_variable = computed(() => {
  return {
    where: {
      release_status: {
        _eq: "verified",
      },
      ...(virtual_category_id?.value != null &&
      virtual_category_id?.value != "all"
        ? {
            category_id: { _eq: virtual_category_id?.value },
          }
        : {}),
      ...(virtual_search_query?.value
        ? {
            title: {
              _iregex: virtual_search_query?.value?.replace(
                /[.+*?^${}()|[\]\\]/g,
                "\\$&"
              ),
            },
          }
        : {}),
    },
  };
});

const { result: realtime_service_result } = useCustomQuery(
  fetch_realtime_service,
  realtime_service_variable,
  500
);

const { result: virtual_service_result } = useCustomQuery(
  fetch_virtual_service,
  virtual_service_variable,
  500
);

const realtime_Service = computed(() => {
  return realtime_service_result.value?.service?.map((element: any) => {
    return element?.title;
  });
});

const virtual_service = computed(() => {
  return virtual_service_result.value?.service?.map((element: any) => {
    return element?.title;
  });
});

const realtime_category = computed(() => {
  return store?.getRealTimeServiceCategory(locale.value)?.map((element) => {
    return {
      id: element?.id,
      name: element?.name[0]?.name,
    };
  });
});

const virtual_category = computed(() => {
  return store?.getVirtualServiceCategory(locale.value)?.map((element) => {
    return {
      id: element?.id,
      name: element?.name[0]?.name,
    };
  });
});

const handleServiceType = () => {
  if (isRealtimeService.value) {
    router.push("/services/");
  } else {
    router.push("/services/virtual");
  }
};

const virtual_specific_service_handler = (result: any) => {
  router.push({
    name: "services-search-virtual",
    query: { name: result },
  });
};

const realtime_specific_service_handler = (result: any) => {
  router.push({
    name: "services-search-realtime",
    query: { name: result },
  });
};

const select_virtual_category = (value) => {
  virtual_category_id.value = value?.id;
};

const select_service_category = (value) => {
  realtime_category_id.value = value?.id;
};

const virtual_service_update_handler = (value) => {
  virtual_search_query.value = value;
};

const realtime_service_update_handler = (value) => {
  realtime_search_service.value = value;
};

useHead({
  title: "Services",
});

definePageMeta({
  layout: "custom",
});
</script>

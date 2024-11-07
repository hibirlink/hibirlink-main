<template>
  <ClientOnly>
    <main v-if="onLoading">
      <h-loading :show-loading="onLoading"></h-loading>
    </main>
    <main v-else-if="bookmarkedData.length === 0" class="mt-5">
      <h-empty content="No Data Available 🙄"></h-empty>
    </main>
    <main v-else class="p-2">
      <div class="flex gap-3 flex-wrap my-5">
        <div
          v-for="data in bookmarkedData"
          :key="data.service_id"
          class="relative group flex gap-3 min-w-[18rem] max-w-xs border bg-light300 rounded-md overflow-hidden transition-all duration-300 hover:shadow-[0px_0px_10px_5px_rgba(120,120,120,0.2)] p-1"
        >
          <Icon
            @click.self="() => handleRemoveFromBookmark(data.service_id)"
            name="material-symbols:cancel-outline-rounded"
            class="bg-transparent cursor-pointer group-hover:bg-red rounded-md absolute top-3 right-3 w-6 h-6 z-50 text-transparent transition-all ease-in-out duration-200 group-hover:text-light300"
          ></Icon>
          <NuxtLink
            :to="{
              name: 'services-realtime-detail-id',
              params: { id: data.service_id },
            }"
            class="flex flex-col cursor-pointer w-full"
          >
            <div class="overflow-hidden h-[170px] w-full p-2 rounded">
              <div class="h-full w-full overflow-hidden rounded-sm group">
                <nuxt-img
                  :src="data.s.logo"
                  format="webp"
                  loading="lazy"
                  quality="100"
                  fit="inside"
                  class="w-full h-full object-center object-cover group-hover:scale-125 overflow-hidden transition-all ease-in-out duration-300"
                />
              </div>
            </div>
            <h1 class="px-2 text-neutral300 font-semibold capitalize text-sm">
              {{ data.s.title }}
            </h1>

            <h-rating
              class="px-2 ml-auto"
              :readonly="true"
              :rate-value="data.s.average_rate || 0"
            ></h-rating>
          </NuxtLink>
        </div>
      </div>
    </main>
  </ClientOnly>
</template>

<script setup lang="ts">
import rsb from "@/apollo/query/account/rsb.gql";
import delete_realtime_service_book_mark from "~/apollo/mutation/service/realtime/delete_from_bookmark.gql";
import { useAuth } from "~~/store/auth";

const bookmarkedData = ref<
  {
    service_id: number;
    s: { id: number; title: string; logo: string; average_rate: number | null };
  }[]
>([]);

const { uid } = useAuth();
const {
  onResult,
  onError,
  refetch,
  loading: onLoading,
} = useCustomQuery(rsb, {
  where: {
    user_id: { _eq: uid },
  },
});

onResult((result) => {
  bookmarkedData.value = result.data.b;
});

onError((error) => {
  console.log(error);
});

const {
  mutate: delete_bookmark,
  onDone: onDeleteProductFromBookmarkDone,
  onError: onDeleteProductFromBookmarkError,
} = useCustomMutation(delete_realtime_service_book_mark);

onDeleteProductFromBookmarkDone((result) => {
  console.log({ result: result.data });
  refetch();
});

onDeleteProductFromBookmarkError((error) => {
  console.log({ error });
});

const handleRemoveFromBookmark = (service_id: number) => {
  delete_bookmark({ service_id, user_id: uid });
};
</script>

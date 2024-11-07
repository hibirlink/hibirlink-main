<template>
  <main class="flex flex-col gap-4 max-w-[90rem] mx-auto" v-if="detail_loading">
    <h-skeleton-loader>
      <div class="flex gap-6 w-full">
        <div class="space-y-4">
          <div class="w-96 h-72 rounded-t bg-neutral500"></div>
          <div class="w-96 h-16 rounded-t bg-neutral500"></div>
        </div>

        <div class="space-y-3 flex-1">
          <div class="w-3/4 h-7 rounded bg-neutral500"></div>
          <div class="w-full h-36 rounded bg-neutral500"></div>
          <div class="w-full h-7 rounded bg-neutral500"></div>
          <div class="w-full h-7 rounded bg-neutral500"></div>
          <div class="w-3/4 h-7 rounded bg-neutral500"></div>
          <div class="w-2/4 h-7 rounded bg-neutral500"></div>
          <div class="w-full h-7 rounded bg-neutral500"></div>
          <div class="w-full h-7 rounded bg-neutral500"></div>
        </div>
        <div class="space-y-3 w-48">
          <div class="w-full h-6 rounded bg-neutral500"></div>
          <div class="w-full h-6 rounded bg-neutral500"></div>
          <div class="w-full h-6 rounded bg-neutral500"></div>
          <div class="w-2/4 h-6 rounded bg-neutral500"></div>
          <div class="w-full h-6 rounded bg-neutral500"></div>
          <div class="w-full h-6 rounded bg-neutral500"></div>
          <div class="w-full h-6 rounded bg-neutral500"></div>
          <div class="w-3/4 h-6 rounded bg-neutral500"></div>
          <div class="w-2/4 h-6 rounded bg-neutral500"></div>
          <div class="w-full h-6 rounded bg-neutral500"></div>
        </div>
      </div>
    </h-skeleton-loader>
  </main>
  <main class="flex flex-col gap-4 max-w-[90rem] mx-auto" v-else-if="detail">
    <h-notification
      v-model="show_message"
      :success="success"
      :message="message"
    />
    <li
      class="w-full flex justify-start backdrop-blur gap-8 border-b items-center pb-1"
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
          class="absolute top-0 left-0 z-50"
          v-model="open"
        />
      </div>
      <div
        class="flex text-md font-semibold text-dark200 hover:text-primary cursor-pointer space-x-1"
      >
        <Icon name="gridicons:help-outline" class="w-5 h-5" />
        <span>Help</span>
      </div>
    </li>
    <h-bread-crumb />

    <section class="space-y-5">
      <section class="flex gap-5 md:flex-row flex-col">
        <section class="flex-1 flex gap-5 xl:flex-row flex-col">
          <div class="lg:max-w-[20rem]">
            <h-carosel
              :images="groupImages(detail?.logo, detail?.medias)"
              :gallery="true"
            />
          </div>

          <div class="space-y-3">
            <h3 class="font-semibold text-dark100 text-lg">
              {{ detail?.title }}
            </h3>

          
            <p
              class="flex items-center justify-start gap-1"
              v-if="detail?.license != null"
            >
              <Icon name="octicon:verified-24" class="text-primary" />
              licenced (certified)
            </p>
            <p>
              {{ getDescription(detail?.description.ops) }}
            </p>
            <hr class="mt-8 max-w-sm mx-auto" />
            <div class="flex flex-wrap items-end gap-3">
              <h1 class="text-dark100 font-extrabold text-base">
                {{ detail?.availability?.per_week?.length }}
                Days
              </h1>
              <h1 class="text-neutral400 font-extrabold">
                {{
                  calculateTime(
                    detail?.availability?.per_day?.start_time,
                    detail?.availability?.per_day?.end_time
                  )
                }}/24 hours
              </h1>
            </div>
            <div>
              <h2 class="font-semibold">Working Days</h2>
              <div class="flex gap-3 items-center py-2">
                <div
                  v-for="day in detail?.availability?.per_week"
                  :key="day"
                  class="flex gap-1 items-center"
                >
                  <Icon
                    name="material-symbols:done"
                    class="w-5 h-5 text-primaryvar1"
                  />
                  <p class="font-semibold">{{ day }}</p>
                </div>
              </div>
            </div>
            <p class="text-neutral300">
              Score:
              <span class="font-semibold text-dark100 space-x-1">
                <Icon
                  v-for="i in 3"
                  :key="i"
                  name="solar:crown-minimalistic-bold"
                  class="text-orange"
                />
                <Icon
                  v-for="i in 2"
                  :key="i"
                  name="solar:crown-minimalistic-bold-duotone"
                  class="text-orange"
                />
                {{ detail?.average_rate }}
              </span>
            </p>
          </div>
        </section>
        <aside
          class="bg-light400 bg-opacity-40 rounded py-4 px-6 h-fit md:flex flex-col gap-3 max-w-[16.5rem] hidden"
        >
          <Icon
            name="mdi:car-sports"
            class="w-8 h-8 bg-purple p-1 text-light400 rounded-full self-center"
          />

          <button
            v-if="!doesIMarkedIT?.is_marked_it?.service_id"
            type="button"
            @click="AddToBookMark"
            :disabled="loading_book_mark"
            class="inline-block rounded-sm bg-primaryvar1 disabled:bg-primaryvar4 disabled:cursor-wait px-6 py-2 font-bold leading-normal text-light300 shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primaryvar1 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
          >
            <Icon name="material-symbols:bookmark-add" class="w-6 h-6" />

            Save Service
          </button>
          <button
            v-else-if="uid"
            type="button"
            @click="deleteFromBookMark"
            :disabled="loading_book_mark"
            class="inline-block rounded-sm bg-primaryvar1 disabled:bg-primaryvar4 disabled:cursor-wait px-6 py-2 font-bold leading-normal text-light300 shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primaryvar1 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
          >
            <Icon name="material-symbols:bookmark-remove" class="w-6 h-6" />
            Unmark Service
          </button>

          <hr class="m-3" />

          <h4 class="font-bold text-center text-neutral300">Contacts</h4>
          <p class="flex items-center justify-center gap-1">
            <Icon name="icon-park-solid:phone-telephone" class="text-primary" />
            {{ detail?.phone_number }}
          </p>
          <p class="flex items-center justify-center gap-1">
            <Icon name="heroicons:envelope-20-solid" class="text-primary" />
            {{ detail?.supplier?.userById?.email }}
          </p>
      
          <!-- <div class="flex flex-wrap gap-3 items-center justify-center py-2">
            <Icon name="mdi:facebook" class="w-6 h-6 text-dark200" />
            <Icon name="ri:instagram-fill" class="w-6 h-6 text-dark200" />
            <Icon name="ic:baseline-telegram" class="w-6 h-6 text-dark200" />
            <Icon name="ion:logo-tiktok" class="w-6 h-6 text-dark200" />
            <Icon name="mdi:twitter" class="w-6 h-6 text-dark200" />
            <Icon name="mdi:youtube" class="w-6 h-6 text-dark200" />
          </div>
        -->
          <NuxtLink
            :to="{ name: 'account-chat-index-id', params: { id: 1 } }"
            class="flex items-center justify-center gap-2 rounded-full bg-primary px-3 py-1.5 font-bold leading-normal text-dark100 transition duration-150 ease-in-out hover:bg-primaryvar1 focus:bg-primaryvar1 focus:outline-none focus:ring-0 active:bg-primary"
          >
            <Icon name="majesticons:chats-2" />
            Start Chat
          </NuxtLink>
          <button
            type="button"
            class="inline-block rounded-full border-2 border-primary px-3 py-1.5 font-bold leading-normal text-primary transition duration-150 ease-in-out hover:bg-light100 focus:outline-none focus:ring-0 active:bg-primary active:text-dark100"
          >
            <Icon name="icon-park-solid:phone-telephone" />
            Call to Supplier
          </button>
        </aside>
      </section>

      <section>
        <h-tab
          :tabs="[{ text: 'service_profile' }, { text: 'rate_and_revieews' }]"
          tabsClass="justify-start bg-light300"
        >
          <template #service_profile>
            <section class="flex flex-col gap-4 px-2">
              <div
                class="font-medium text-sm flex items-center gap-6 flex-wrap"
              >
                <p class="flex items-center justify-center gap-1">
                  <Icon
                    name="octicon:verified-24"
                    class="text-primary"
                    v-if="detail?.license != null"
                  />
                  licenced (certified)
                </p>
                <p>
                  Main Category:
                  {{
                    findNameBasedOnLanguage(detail?.category?.name?.to, locale)
                      ?.name
                  }}
                </p>
                <p class="flex items-center justify-center gap-1">
                  Rating:
                  <Icon
                    name="solar:crown-minimalistic-bold"
                    class="text-orange"
                  />
                  {{ detail?.average_rate }}
                </p>
                <p class="flex items-center justify-center gap-1">
                  <Icon
                    name="icon-park-solid:phone-telephone"
                    class="text-primary"
                  />
                  {{ detail?.phone_number }}
                </p>
                <p class="flex items-center justify-center gap-1">
                  <Icon
                    name="heroicons:envelope-20-solid"
                    class="text-primary"
                  />
                  {{ detail?.supplier?.userById?.email }}
                </p>
              </div>
            <h4 class="md:hidden block font-bold text-center text-neutral300">
                Socials
              </h4> -->
              <div
                class="md:hidden flex flex-wrap gap-3 items-center justify-center py-2"
              >
                <!-- <Icon name="mdi:facebook" class="w-6 h-6 text-dark200" />
                <Icon name="ri:instagram-fill" class="w-6 h-6 text-dark200" />
                <Icon
                  name="ic:baseline-telegram"
                  class="w-6 h-6 text-dark200"
                />
                <Icon name="ion:logo-tiktok" class="w-6 h-6 text-dark200" />
                <Icon name="mdi:twitter" class="w-6 h-6 text-dark200" />
                <Icon name="mdi:youtube" class="w-6 h-6 text-dark200" /> -->
              </div>
              <div class="w-full h-[30rem]">
                <h-geo-location-map
                  :center="{
                    lng: detail?.service_addresses[0].longitude,
                    lat: detail?.service_addresses[0]?.latitude,
                  }"
                  :information="maps(detail.service_addresses)"
                  :max-zoom="20"
                >
                  <template #popup="{ popup }">
                    <div class="flex flex-col gap-3 h-[10rem]">
                      <span class="text-base font-semibold text-darkblue/60">
                        {{
                          findNameBasedOnLanguage(
                            popup?.sub_city?.region_city?.name?.to,
                            locale
                          )?.name
                        }},
                        {{
                          findNameBasedOnLanguage(
                            popup?.sub_city?.name?.to,
                            locale
                          )?.name
                        }}
                      </span>

                      <span class="text-sm font-medium text-dark300/60">{{
                        popup?.description
                      }}</span>
                    </div>
                  </template>
                </h-geo-location-map>
              </div>
            </section>
          </template>

          <template #rate_and_revieews>
            <section class="flex flex-col gap-4 px-2">
              <h-rating
                @update="updateRate"
                :readonly="false"
                :rateValue="uid ? your_rate_comment_value?.rate || 0 : 0"
              />

              <textarea
                placeholder="Add Comment here"
                v-model="your_comment"
                class="border-[1px] border-primaryvar4 min-h-[1rem] rounded-md"
              />

              <div class="flex justify-end">
                <button
                  @click="postCommentAndRate"
                  :disabled="(!rate || !your_comment) && loading_rate"
                  class="text-sm font-meduim bg-primaryvar5 px-3 py-1 rounded-md hover:bg-primary1 disabled:bg-primaryvar8 disabled:cursor-wait"
                >
                  Post
                </button>
              </div>
              <div
                class="flex flex-row items-center gap-2"
                v-for="com in detail?.review"
                :key="com?.user.id"
              >
                <span
                  class="w-[2rem] h-[2rem] rounded-[100%] bg-dark300/20 flex justify-center items-center"
                >
                  {{ com?.user?.first_name[0]
                  }}{{ com?.user?.last_name[0] }}</span
                >

                <div class="flex flex-col">
                  <span class="text-sm font-semibold text-dark300/60">
                    {{ com?.user?.first_name }}

                    {{ com?.user?.last_name }}
                  </span>
                  <h-rating :rate-value="com?.rate" :readonly="true" />
                  <p class="text-sm font-medium text-dark300/60">
                    {{ com?.comment }}
                  </p>
                </div>
              </div>
            </section>
          </template>
        </h-tab>
      </section>
    </section>

    <section>
      <h3
        class="text-lg text-dark100 font-extrabold pb-1.5"
        v-if="detail?.category?.related_service?.length > 0"
      >
        Related Services
      </h3>
      <div class="flex flex-wrap gap-4">
        <service-tertiary-card
          class="max-w-[15rem]"
          v-for="item in detail?.category?.related_service"
          :key="item?.id"
          :id="item?.id"
          :type="Type.REALTIME"
          :title="item?.title"
          :description="getDescription(detail?.description?.ops)"
          :images="groupImages(item.logo, item?.media)"
        />
      </div>
    </section>

    <footer
      class="fixed md:hidden left-0 bottom-0 right-0 flex gap-4 items-center justify-start px-4 h-16 bg-light300 shadow-[0px_0px_18px_6px_rgba(130,130,130,0.2)]"
    >
      <NuxtLink
        :to="{ name: 'account-chat-index-id', params: { id: 1 } }"
        class="flex items-center justify-center gap-2 rounded-full bg-primary px-3 py-1.5 font-bold leading-normal text-dark100 transition duration-150 ease-in-out hover:bg-primaryvar1 focus:bg-primaryvar1 focus:outline-none focus:ring-0 active:bg-primary"
      >
        <Icon name="majesticons:chats-2" />
        Start Chat
      </NuxtLink>
      <button
        type="button"
        class="inline-block rounded-full bg-primary px-3 py-1.5 font-bold leading-normal text-dark100 transition duration-150 ease-in-out hover:bg-primaryvar1 focus:bg-primaryvar1 focus:outline-none focus:ring-0 active:bg-primary"
      >
        <Icon name="icon-park-solid:phone-telephone" />
        Call to Supplier
      </button>
      <button
        v-if="!doesIMarkedIT?.is_marked_it?.service_id"
        type="button"
        @click="AddToBookMark"
        :disabled="loading_book_mark"
        data-te-ripple-init
        data-te-ripple-color="light"
        class="absolute right-4 -top-6 disabled:bg-primaryvar5 disabled:cursor-wait inline-block rounded-full bg-primaryvar1 w-12 h-12 leading-normal text-light300 shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primaryvar1 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
      >
        <Icon name="material-symbols:bookmark-add" class="w-6 h-6" />
      </button>
      <button
        type="button"
        :disabled="loading_book_mark"
        v-else-if="uid"
        @click="deleteFromBookMark"
        data-te-ripple-init
        data-te-ripple-color="light"
        class="absolute right-4 -top-6 disabled:bg-primaryvar5 disabled:cursor-wait inline-block rounded-full bg-primaryvar1 w-12 h-12 leading-normal text-light300 shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primaryvar1 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
      >
        <Icon name="material-symbols:bookmark-remove" class="w-6 h-6" />
      </button>
    </footer>
  </main>
</template>

<script setup lang="ts">
import detail_gql from "~/apollo/query/service/realtime/fetch_detail.gql";
import your_review from "~/apollo/query/service/realtime/your_review.gql";
import post_comment_rate_gql from "~/apollo/mutation/service/realtime/add_comment_rate.gql";
import add_book_mark_gql from "~/apollo/mutation/service/realtime/add_book_mark.gql";
import is_marked_it_gql from "~/apollo/query/service/realtime/is_marked_it.gql";
import remove_from_book_mark from "~/apollo/mutation/service/realtime/delete_from_bookmark.gql";
import { useAuth } from "~~/store/auth";
import { useStore } from "~~/store/data";
const rate = ref(null);
const route = useRoute();
const router = useRouter();
const { uid } = useAuth();
const store = useStore();
const enable_your_rate_query = ref(false);
const enable_your_book_mark = ref(false);
const your_comment = ref("");
const loading_rate = ref(false);
const loading_book_mark = ref(false);
const show_message = ref(false);
const success = ref(false);
const message = ref("");
const open = ref(false);

const { locale } = useI18n();

enum Type {
  REALTIME,
  VIRTUAL,
}

const variable = computed(() => {
  return {
    where: {
      release_status: { _eq: "verified" },
      id: { _eq: route?.params?.id },
    },
    id: route?.params?.id,
  };
});

const fetch_marked_variable = computed(() => {
  return {
    service_id: route?.params?.id,
    user_id: uid,
  };
});

const your_comment_variable = computed(() => {
  return {
    service_id: route?.params?.id,
    user_id: uid,
  };
});

const {
  result: detail_result,
  error: detail_error,
  loading: detail_loading,
  refetch: refetch_detail,
  fetchMore: moreDetail,
} = useCustomQuery(detail_gql, variable);

const {
  mutate: deleteFromMarked,
  onDone: onDeletedFromMarked,
  onError: onDeletedFromMarkedError,
} = useCustomMutation(remove_from_book_mark);

const {
  mutate: add_book_mark,
  onDone: onAddBookMark,
  onError: onAddBookMarkError,
} = useCustomMutation(add_book_mark_gql);

const {
  result: your_comment_result,
  error: your_comment_error,
  refetch: refetch_your_comment,
} = useCustomQuery(
  your_review,
  your_comment_variable,
  0,
  enable_your_rate_query
);

const {
  result: doesIMarkedIT,
  error: markedItError,
  refetch: refetch_your_marked,
} = useCustomQuery(
  is_marked_it_gql,
  fetch_marked_variable,
  0,
  enable_your_book_mark
);

const {
  mutate: post_comment_rate,
  onDone: onPostCommentRate,
  onError: onPostCommentRateError,
} = useCustomMutation(post_comment_rate_gql);
const your_rate_comment_value = computed(() => {
  return your_comment_result.value?.review;
});

const detail = computed(() => {
  if (detail_result.value?.detail?.length > 0)
    return detail_result.value?.detail[0];
  return null;
});

const maps = (value: any) => {
  console.log(value);

  return value?.map((element: any) => {
    return {
      lat: element?.latitude,
      lng: element?.longitude,
      popup: {
        sub_city: element?.sub_city,
        region: element?.sub_city?.region_city,
        description: element?.description,
      },
    };
  });
};

onPostCommentRate((result) => {
  success.value = true;
  message.value = "successfully";
  show_message.value = true;
  loading_rate.value = false;
  refetch_your_comment();
  moreDetail({ variables: variable.value });
});

onPostCommentRateError((error) => {
  success.value = false;
  message.value = error?.message;
  show_message.value = true;

  loading_rate.value = false;
});

onAddBookMark((result) => {
  success.value = true;
  message.value = "successfully";
  show_message.value = true;
  loading_book_mark.value = false;
  refetch_your_marked();
});

onAddBookMarkError((error) => {
  success.value = false;
  message.value = error?.message;
  show_message.value = true;
  loading_book_mark.value = false;
});
onDeletedFromMarked((result) => {
  success.value = true;
  message.value = "successfully Removed from Book Mark";
  show_message.value = true;
  loading_book_mark.value = false;
  refetch_your_marked();
});
onDeletedFromMarkedError((error) => {
  success.value = false;
  message.value = error?.message;
  show_message.value = true;
  loading_book_mark.value = false;
});

const updateRate = (value) => {
  if (uid) {
    rate.value = value;
  } else {
    router.push({ name: "auth-signIn" });
  }
};

const deleteFromBookMark = () => {
  if (uid) {
    deleteFromMarked({ service_id: route.params?.id, user_id: uid });
    loading_book_mark.value = true;
  }
};

const AddToBookMark = () => {
  if (uid) {
    loading_book_mark.value = true;
    add_book_mark({
      object: {
        service_id: route.params?.id,
        user_id: uid,
      },
    });
  } else {
    router.push({ name: "auth-signIn" });
  }
};

const postCommentAndRate = () => {
  if (uid) {
    loading_rate.value = true;
    if (rate.value && your_comment.value)
      post_comment_rate({
        object: {
          service_id: route?.params?.id,
          user_id: uid,
          comment: your_comment.value,
          rate: rate.value,
        },
        onconflict: {
          constraint: "realtime_service_rate_pkey",
          update_columns: ["comment", "rate"],
        },
      });
    else if (rate?.value) {
      post_comment_rate({
        object: {
          service_id: route?.params?.id,
          user_id: uid,

          rate: rate.value,
        },
        onconflict: {
          constraint: "realtime_service_rate_pkey",
          update_columns: ["rate"],
        },
      });
    } else if (your_comment.value) {
      post_comment_rate({
        object: {
          service_id: route?.params?.id,
          user_id: uid,
          comment: your_comment.value,
        },
        onconflict: {
          constraint: "realtime_service_rate_pkey",
          update_columns: ["comment"],
        },
      });
    } else {
      loading_rate.value = false;
    }
  } else {
    router.push({ name: "auth-signIn" });
  }
};

watchEffect(() => {
  if (uid) {
    your_comment.value = your_rate_comment_value.value?.comment;

    enable_your_book_mark.value = true;
    enable_your_rate_query.value = true;
  } else {
    enable_your_book_mark.value = false;
    enable_your_rate_query.value = false;
  }
});

const for_dropdown_service_category = computed(() => {
  return service_categories?.value?.map((element) => {
    return {
      name: element.name[0]?.name,
      id: element.id,
    };
  });
});

const service_categories = computed(() => {
  return store.getRealTimeServiceCategory(locale.value);
});
const select_category_handler = (value) => {
  router.push({
    name: "services-category-name-id",
    params: { name: value.name, id: value.id },
  });
};

useHead({
  title: "Services",
});

definePageMeta({
  layout: "custom",
});
</script>

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
        class="flex relative items-center gap-2 2xl:text-base text-md font-semibold"
      >
        <Icon name="icon-park-solid:all-application" class="w-5 h-5" />
        <span @mouseenter="openDropDown = true">All</span>
        <h-nested-dropdown
          :all-category="virtual_service_category"
          @select:category="select_category_handler"
          class="absolute top-0 left-0 z-30"
          v-model="openDropDown"
        />
      </div>
      <!-- <div
        class="flex text-md font-semibold text-dark200 hover:text-primary cursor-pointer space-x-1"
      >
        <Icon name="gridicons:help-outline" class="w-5 h-5" />
        <span>Help</span>
      </div> -->
    </li>
    <h-bread-crumb />

    <section class="space-y-5">
      <section class="flex gap-5 md:flex-row flex-col">
        <section class="flex-1 flex gap-5 xl:flex-row flex-col">
          <div class="max-w-[30rem]">
            <h-carosel
              :images="groupImages(detail.logo, detail.media)"
              :gallery="true"
            />
          </div>

          <div class="space-y-3">
            <h3 class="font-semibold text-dark100 text-lg">
              {{ detail?.title }}
            </h3>
            <p class="flex items-center justify-start gap-1">
              <Icon
                name="octicon:verified-24"
                class="text-primary"
                v-if="detail.license != null"
              />
              licenced (certified)
            </p>
            <p>
              {{ getDescription(detail?.description?.ops) }}
            </p>
            <hr class="mt-8 max-w-sm mx-auto" />

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
                {{ detail?.average_rate || 0 }}
              </span>
            </p>
          </div>
        </section>
        <aside
          class="bg-light400 bg-opacity-40 rounded py-4 px-6 h-fit md:flex flex-col gap-3 max-w-[16.5rem] hidden"
        >
          <button
            v-if="!your_book_mark?.service_id"
            type="button"
            @click="AddToBookMark"
            :disabled="loading_mark"
            class="inline-block rounded-sm bg-primaryvar1 disabled:bg-primaryvar4 disabled:cursor-wait px-6 py-2 font-bold leading-normal text-light300 shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primaryvar1 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
          >
            <Icon name="material-symbols:bookmark-add" class="w-6 h-6" />

            Save Service
          </button>
          <button
            v-else-if="uid"
            type="button"
            @click="deleteFromBookMark"
            :disabled="loading_mark"
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
          <div class="flex flex-wrap gap-3 items-center justify-center py-2">
            <div v-if="detail?.social_media">
              <a v-for="media in detail?.social_media" :href="media?.value"
                ><Icon
                  :name="'mdi:' + media?.key?.toLowerCase()"
                  class="w-6 h-6 text-dark200"
              /></a>
            </div>
          </div>

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
                <p
                  class="flex items-center justify-center gap-1"
                  v-if="detail?.license != null"
                >
                  <Icon name="octicon:verified-24" class="text-primary" />
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
                  {{ detail?.average_rate || 0 }}
                </p>
                <p class="flex items-center justify-center gap-1">
                  <Icon
                    name="icon-park-solid:phone-telephone"
                    class="text-primary"
                  />
                  {{ detail?.supplier?.userById?.phone_number }}
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
              </h4>
              <div
                class="md:hidden flex flex-wrap gap-3 items-center justify-center py-2"
              >
                <Icon name="mdi:facebook" class="w-6 h-6 text-dark200" />
                <Icon name="ri:instagram-fill" class="w-6 h-6 text-dark200" />
                <Icon
                  name="ic:baseline-telegram"
                  class="w-6 h-6 text-dark200"
                />
                <Icon name="ion:logo-tiktok" class="w-6 h-6 text-dark200" />
                <Icon name="mdi:twitter" class="w-6 h-6 text-dark200" />
                <Icon name="mdi:youtube" class="w-6 h-6 text-dark200" />
              </div>
            </section>
          </template>

          <template #rate_and_revieews>
            <section class="flex flex-col gap-4 px-2">
              <h-rating
                @update="updateRate"
                :readonly="false"
                :rateValue="uid ? your_review?.rate || 0 : 0"
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

    <section v-if="detail?.category?.related_service?.length > 0">
      <h3 class="text-lg text-dark100 font-extrabold pb-1.5">
        Related Services
      </h3>
      <div class="flex flex-wrap gap-4">
        <service-tertiary-card
          class="max-w-[15rem]"
          v-for="service in detail?.category?.related_service"
          :key="service?.id"
          :id="service?.id"
          :type="Type.VIRTUAL"
          :title="service?.title"
          :description="getDescription(service?.description?.ops)"
          :images="groupImages(detail?.logo, detail?.media)"
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
        v-if="!your_book_mark?.service_id"
        type="button"
        @click="AddToBookMark"
        :disabled="loading_mark"
        data-te-ripple-init
        data-te-ripple-color="light"
        class="absolute right-4 -top-6 inline-block disabled:bg-primaryvar5 disabled:cursor-wait rounded-full bg-primaryvar1 w-12 h-12 leading-normal text-light300 shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primaryvar1 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
      >
        <Icon name="material-symbols:bookmark-add" class="w-6 h-6" />
      </button>
      <button
        v-else-if="uid"
        type="button"
        @click="deleteFromBookMark"
        :disabled="loading_mark"
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
import fetch_detail from "~/apollo/query/service/virtual/fetch_detail.gql";
import comment_rate from "~/apollo/query/service/virtual/your_review.gql";
import add_review_gql from "~/apollo/mutation/service/virtual/add_rate_comment.gql";
import add_book_mark_gql from "~/apollo/mutation/service/virtual/add_book_mark.gql";
import delete_from_gql from "~/apollo/mutation/service/virtual/delete_from_bookmark.gql";
import is_marked_it_gql from "~/apollo/query/service/virtual/is_you_marked_it.gql";
import { useStore } from "~/store/data";
import { useAuth } from "~/store/auth";
const openDropDown = ref(false);
const route = useRoute();
const router = useRouter();
const { locale } = useI18n();
const rate = ref(null);
const { uid } = useAuth();
const store = useStore();
const your_comment = ref("");
const enable_your_rate_query = ref(false);
const enable_your_book_mark = ref(false);
const loading_rate = ref(false);
const loading_mark = ref(false);
const show_message = ref(false);
const success = ref(false);
const message = ref("");

enum Type {
  REALTIME,
  VIRTUAL,
}

const variable = computed(() => {
  return {
    where: {
      id: { _eq: route.params?.id },
      release_status: { _eq: "verified" },
    },
  };
});

const review_variable = computed(() => {
  return {
    service_id: route?.params?.id,
    user_id: uid,
  };
});

const {
  refetch: refetch_your_marked,
  result: your_mark_result,
  error: your_marked_error,
  loading: your_marked_loading,
} = useCustomQuery(is_marked_it_gql, review_variable, 0, enable_your_book_mark);

const {
  result: virtual_product_detail,
  error: fetch_detail_error,
  fetchMore: moreDetail,
  refetch: refetchDetail,
  loading: detail_loading,
} = useCustomQuery(fetch_detail, variable);

const {
  error: comment_rate_error,
  loading: comment_rate_loading,
  result: comment_rate_result,
  refetch: refetch_your_review,
} = useCustomQuery(comment_rate, review_variable, 0, enable_your_rate_query);

const {
  onError: onAddCommentAndRateError,
  onDone: onAddCommentAndRate,
  mutate: add_comment_rate,
} = useCustomMutation(add_review_gql);

const {
  onError: onAddBookMarkError,
  onDone: onAddBookMark,
  mutate: addBookMark,
} = useCustomMutation(add_book_mark_gql);
const {
  onError: onDeleteBookMarkError,
  onDone: onDeleteBookMark,
  mutate: deleteBookMark,
} = useCustomMutation(delete_from_gql);

const detail = computed(() => {
  if (virtual_product_detail?.value?.detail?.length > 0)
    return virtual_product_detail?.value?.detail[0];
  return null;
});
const your_book_mark = computed(() => {
  return your_mark_result.value?.is_marked_it;
});

const your_review = computed(() => {
  return comment_rate_result.value?.review;
});

const updateRate = (value: any) => {
  rate.value = value;
};

const postCommentAndRate = () => {
  if (uid) {
    if (your_comment.value && rate.value) {
      loading_rate.value = true;
      add_comment_rate({
        object: {
          service_id: route.params?.id,
          user_id: uid,
          comment: your_comment.value,
          rate: rate.value,
        },
        onconflict: {
          constraint: "virtual_service_rate_pkey",
          update_columns: ["comment", "rate"],
        },
      });
    } else if (your_comment.value) {
      loading_rate.value = true;
      add_comment_rate({
        object: {
          service_id: route.params?.id,
          user_id: uid,
          comment: your_comment.value,
        },
        onconflict: {
          constraint: "virtual_service_rate_pkey",
          update_columns: ["comment"],
        },
      });
    } else if (rate.value) {
      loading_rate.value = true;

      add_comment_rate({
        object: {
          service_id: route.params?.id,
          user_id: uid,
          rate: rate.value,
        },
        onconflict: {
          constraint: "virtual_service_rate_pkey",
          update_columns: ["rate"],
        },
      });
    } else loading_rate.value = false;
  } else {
    router.push({ name: "auth-signIn" });
  }
};

const AddToBookMark = () => {
  if (uid) {
    loading_mark.value = true;

    addBookMark({ object: { service_id: route.params?.id, user_id: uid } });
  } else {
    router.push({ name: "auth-signIn" });
  }
};

const deleteFromBookMark = () => {
  if (uid) {
    loading_mark.value = true;

    deleteBookMark({ service_id: route.params?.id, user_id: uid });
  } else {
    router.push({ name: "auth-signIn" });
  }
};

onDeleteBookMark((result) => {
  loading_mark.value = false;
  success.value = true;
  message.value = "successfully";
  show_message.value = true;
  loading_mark.value = false;
  refetch_your_marked();
});

onDeleteBookMarkError((error) => {
  loading_mark.value = false;
  success.value = false;
  message.value = error.message;
  show_message.value = true;
  loading_mark.value = false;
});

onAddCommentAndRate((result) => {
  success.value = true;
  message.value = "successfully";
  show_message.value = true;
  loading_rate.value = false;
  enable_your_rate_query.value = true;
  refetch_your_review();
  //moreDetail({ variables: variable.value });
});

onAddCommentAndRateError((error) => {
  success.value = false;
  message.value = error.message;
  show_message.value = true;
  loading_rate.value = false;
});

onAddBookMark((result) => {
  success.value = true;
  message.value = "successfully";
  show_message.value = true;
  loading_mark.value = false;
  refetch_your_marked();
});

onAddBookMarkError((error) => {
  success.value = false;
  message.value = error?.message;
  show_message.value = true;
  loading_mark.value = false;
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

watchEffect(() => {
  if (uid) {
    your_comment.value = your_review?.value?.comment;
    enable_your_rate_query.value = true;
    enable_your_book_mark.value = true;
  } else {
    enable_your_rate_query.value = false;
    enable_your_book_mark.value = false;
  }
});

useHead({
  title: "Products",
});

definePageMeta({
  layout: "custom",
});
</script>

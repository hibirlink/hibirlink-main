<template>
  <main class="flex flex-col gap-4 max-w-[90rem] mx-auto" v-if="false">
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
      detail
      <div
        class="flex relative text-md font-semibold text-dark200 hover:text-primary cursor-pointer space-x-1"
        @mouseenter="($event) => (openDropDown = true)"
        @mouseleave="($event) => (openDropDown = false)"
      >
        <Icon name="fluent:grid-24-filled" class="w-5 h-5" />
        <span>All Categories</span>
        <h-nested-dropdown
          :open="openDropDown"
          :all-category="category"
          class="absolute top-2"
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
          <div class="w-96">
            <h-carosel
              :images="groupImages(detail?.cover_image, detail?.medias)"
              :gallery="true"
            />
          </div>

          <div class="space-y-3">
            <h3 class="font-semibold text-dark100 text-lg">
              {{ detail?.title }}
            </h3>

            <ClientOnly>
              <h-rich-text :content="detail?.description"
            /></ClientOnly>
            <hr class="mt-8 max-w-sm mx-auto" />
            <div class="flex flex-wrap items-end gap-3">
              <h1 class="text-dark100 font-extrabold text-lg">
                {{ detail?.unit_price }} ETB
              </h1>
            </div>
            <div class="flex flex-wrap items-end gap-3">
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
          </div>
        </section>
        <aside
          class="bg-light400 bg-opacity-40 rounded py-4 px-6 h-fit md:flex flex-col gap-3 max-w-[16.5rem] hidden"
        >
          <h4 class="font-semibold text-dark100">
            Unit Price
            <span class="font-extrabold text-lg pl-0.5"
              >{{ detail?.unit_price }} ETB</span
            >
          </h4>

          <button
            v-if="!is_you_marked?.user_id"
            type="button"
            @click="add_book_mark"
            :disabled="loading_mark"
            class="inline-block rounded-sm bg-primaryvar1 disabled:bg-primaryvar4 disabled:cursor-wait px-6 py-2 font-bold leading-normal text-light300 shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primaryvar1 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
          >
            <Icon name="material-symbols:bookmark-add" class="w-6 h-6" />

            Save Product
          </button>
          <button
            v-else-if="uid"
            type="button"
            @click="deleteFromBookMark"
            :disabled="loading_mark"
            class="inline-block rounded-sm bg-primaryvar1 disabled:bg-primaryvar4 disabled:cursor-wait px-6 py-2 font-bold leading-normal text-light300 shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primaryvar1 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
          >
            <Icon name="material-symbols:bookmark-remove" class="w-6 h-6" />
            Unmark Product
          </button>

          <hr class="m-3" />

          <h4
            class="font-bold text-center text-neutral300"
            v-if="detail?.weblink"
          >
            Links for this Item
          </h4>

          <a :href="detail?.weblink" />
          <!-- <div class="flex flex-wrap gap-3 items-center justify-center py-2">
            <Icon name="mdi:facebook" class="w-6 h-6 text-dark200" />
            <Icon name="ri:instagram-fill" class="w-6 h-6 text-dark200" />
            <Icon name="ic:baseline-telegram" class="w-6 h-6 text-dark200" />
            <Icon name="ion:logo-tiktok" class="w-6 h-6 text-dark200" />
            <Icon name="mdi:twitter" class="w-6 h-6 text-dark200" />
            <Icon name="mdi:youtube" class="w-6 h-6 text-dark200" />
          </div>-->
          <NuxtLink
            :to="{ name: 'account-chat-index-id', params: { id: 1 } }"
            class="flex items-center justify-center gap-1 rounded-full bg-primary px-3 py-1.5 font-bold leading-normal text-dark100 transition duration-150 ease-in-out hover:bg-primaryvar1 focus:bg-primaryvar1 focus:outline-none focus:ring-0 active:bg-primary"
          >
            <Icon name="majesticons:chats-2" />
            Start Chat
          </NuxtLink>
          <button
            type="button"
            class="inline-block rounded-full border-2 border-primary px-3 py-1.5 font-bold leading-normal text-primary transition duration-150 ease-in-out hover:bg-light100 focus:outline-none focus:ring-0 active:bg-primary active:text-dark100"
          >
            Call to Supplier
            <Icon name="icon-park-solid:phone-telephone" />
          </button>
        </aside>
      </section>

      <section>
        <h-tab
          :tabs="[{ text: 'supplier_profile' }, { text: 'rate_and_revieews' }]"
          tabsClass="justify-start bg-light300"
        >
          <template #supplier_profile>
            <section class="flex flex-col gap-4 px-2">
              <h3 class="font-semibold">
                Business Name:
                <a href="#" class="text-primary underline">hibirbits</a>
              </h3>

              <div
                class="font-medium text-sm flex items-center gap-6 flex-wrap"
              >
                <p class="flex items-center justify-center gap-1">
                  <Icon name="octicon:verified-24" class="text-primary" />
                  licenced (certified)
                </p>
                <p>Main Category: Computer</p>
                <p class="flex items-center justify-center gap-1">
                  Rating:
                  <Icon
                    name="solar:crown-minimalistic-bold"
                    class="text-orange"
                  />
                  3.9
                </p>
                <p class="flex items-center justify-center gap-1">
                  <Icon
                    name="icon-park-solid:phone-telephone"
                    class="text-primary"
                  />
                  +251 941 431 679
                </p>
                <p class="flex items-center justify-center gap-1">
                  <Icon
                    name="heroicons:envelope-20-solid"
                    class="text-primary"
                  />
                  hibirlink@gmail.com
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
              <h3 class="font-semibold">Stores</h3>
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

    <section v-if="detail?.category?.related_product?.length > 0">
      <h3 class="text-lg text-dark100 font-extrabold pb-1.5">
        Related Products
      </h3>
      <div class="flex flex-wrap gap-4">
        <product-secondary-card
          v-for="product in detail?.category?.related_product"
          :key="product?.id"
          :id="product?.id"
          :type="Type.VIRTUAL"
          :title="product?.title"
          :price="product?.unit_price"
          :image="product?.cover_image"
        />
      </div>
    </section>

    <div class="md:hidden block">
      <h-dialog title="Add to Cart" v-model="showDialog">
        <template #content>
          <div class="flex flex-col gap-2">
            <h4 class="font-semibold text-dark100">
              Unit Price
              <span class="font-extrabold text-lg pl-0.5">
                {{ detail?.unit_price }} ETB</span
              >
            </h4>

            <div class="flex flex-wrap gap-3 items-center justify-center py-2">
              <Icon
                v-for="i in 3"
                :key="i"
                name="mdi:car-sports"
                class="w-8 h-8 bg-purple p-1 text-light400 rounded-full"
              />
            </div>

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
          </div>
        </template>
      </h-dialog>
    </div>

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
      </button>
      <button
        type="button"
        data-te-ripple-init
        data-te-ripple-color="light"
        @click="($event) => (showDialog = true)"
        class="absolute right-4 -top-6 inline-block rounded-full bg-primaryvar1 w-12 h-12 leading-normal text-light300 shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primaryvar1 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
      >
        <Icon name="fa6-solid:cart-plus" class="w-6 h-6" />
      </button>
    </footer>
  </main>
</template>

<style scoped>
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}
</style>

<script setup lang="ts">
import product_detail from "~/apollo/query/product/virtual/fetch_detail.gql";
import add_mark from "~/apollo/mutation/product/virtual/add_book_mark.gql";
import your_marked_gql from "~/apollo/query/product/virtual/does_you_marked.gql";
import delete_bookmark_gql from "~/apollo/mutation/product/virtual/delete_from_book_mark.gql";
import add_comment_rate_gql from "~/apollo/mutation/product/virtual/add_comment_rate.gql";
import your_review_gql from "~/apollo/query/product/virtual/your_review.gql";

import { useAuth } from "~/store/auth";
import { useStore } from "~/store/data";
const { uid } = useAuth();
const enable_marked = ref(false);
const openDropDown = ref(false);
const showDialog = ref(false);
const quantity = ref<number>(0);
const route = useRoute();
const router = useRouter();
const store = useStore();
const your_comment = ref("");
const enable_your_rate_query = ref(false);
const loading_rate = ref(false);
const loading_mark = ref(false);
const show_message = ref(false);
const success = ref(false);
const message = ref("");
const rate = ref(null);

watchEffect(() => {
  if (typeof quantity.value === "string") quantity.value = 0;
});

enum Type {
  REALTIME,
  VIRTUAL,
}

const variable_for_mark = computed(() => {
  return {
    product_id: route.params?.id,
    user_id: uid,
  };
});

const variable = computed(() => {
  return {
    where: {
      id: { _eq: route.params?.id },
      release_status: {
        _eq: "verified",
      },
    },
  };
});

const {
  mutate: addBookMark,
  onDone: onAddBookMark,
  onError: onAddBookMarkError,
} = useCustomMutation(add_mark);

const {
  mutate: deleteBookMark,
  onDone: onDeleteBookMark,
  onError: onDeleteBookMarkError,
} = useCustomMutation(delete_bookmark_gql);

const {
  mutate: add_comment_rate,
  onDone: onAddCommentAndRate,
  onError: onAddCommentAndRateError,
} = useCustomMutation(add_comment_rate_gql);

const {
  result: your_review_result,
  error: your_review_error,
  refetch: refetch_your_review,
} = useCustomQuery(
  your_review_gql,
  variable_for_mark,
  0,
  enable_your_rate_query
);

const {
  result: your_marked,
  error: your_marked_error,
  refetch: refetch_your_marked,
} = useCustomQuery(your_marked_gql, variable_for_mark, 0, enable_marked);

const {
  result: detail_result,
  error: detail_error,
  loading: detail_loading,
  refetch: refetch_detail,
} = useCustomQuery(product_detail, variable);

const detail = computed(() => {
  if (detail_result.value?.detail?.length > 0)
    return detail_result.value?.detail[0];
  else return null;
});
const your_review = computed(() => {
  return your_review_result.value?.review;
});
const is_you_marked = computed(() => {
  return your_marked.value?.your_mark;
});

const add_book_mark = () => {
  if (uid) {
    loading_mark.value = true;
    addBookMark({ object: { user_id: uid, product_id: route?.params?.id } });
  } else {
    router.push("/auth/signin");
  }
};

const deleteFromBookMark = () => {
  if (uid) {
    loading_mark.value = true;
    deleteBookMark({ product_id: route.params?.id, user_id: uid });
  }
};

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
});

onAddCommentAndRateError((error) => {
  success.value = false;
  message.value = error.message;
  show_message.value = true;
  loading_rate.value = false;
});

const postCommentAndRate = () => {
  if (uid) {
    if (your_comment.value && rate.value) {
      loading_rate.value = true;
      add_comment_rate({
        object: {
          product_id: route.params?.id,
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
          product_id: route.params?.id,
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
          product_id: route.params?.id,
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

const updateRate = (value) => {
  rate.value = value;
};

watchEffect(() => {
  if (uid) {
    your_comment.value = your_review?.value?.comment;
    enable_your_rate_query.value = true;
    enable_marked.value = true;
  } else {
    enable_your_rate_query.value = false;
    enable_marked.value = false;
  }
});

useHead({
  title: "Products",
});

definePageMeta({
  layout: "custom",
});
</script>

<template>
  <main
    class="flex flex-col gap-4 max-w-[90rem] mx-auto"
    v-if="product_loading"
  >
    <div class="w-full">
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
    </div>
  </main>
  <main
    class="flex flex-col gap-4 max-w-[90rem] mx-auto"
    v-if="!product_loading && detail"
  >
    <h-notification
      :success="success"
      :message="message"
      v-model="open_notification"
    />
    <li
      class="w-full flex justify-start backdrop-blur gap-8 border-b items-center pb-1"
    >
      <div
        class="flex items-center relative gap-2 2xl:text-base text-md font-semibold hover:text-primary"
        @mouseenter="openDropDown = true"
      >
        <Icon name="icon-park-solid:all-application" class="w-5 h-5" />
        <span>All</span>
        <h-nested-dropdown
          :all-category="allCategory"
          class="absolute top-0 left-0 z-30"
          @select:category="select_category_handler"
          @select:sub-category="select_sub_category_handler"
          v-model="openDropDown"
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
              :images="groupImages(detail.cover_image, detail.medias)"
              :gallery="true"
            />
          </div>

          <div class="space-y-3">
            <h3 class="font-semibold text-dark100 text-lg">
              {{ detail.title }}
            </h3>

            <ClientOnly>
              <h-rich-text :content="detail?.description"
            /></ClientOnly>
            <hr class="mt-8 max-w-sm mx-auto" />
            <div class="flex flex-wrap items-end gap-3">
              <h1 class="text-dark100 font-extrabold text-lg">
                {{ detail.selling_price }} ETB
              </h1>
              <h1 class="text-neutral400 font-extrabold line-through">
                {{ detail?.unit_price }} ETB
              </h1>
              <p class="text-neutral300" v-if="detail?.product_discount?.rate">
                <span class="text-primary font-bold"
                  >{{ detail?.product_discount?.rate }} off</span
                >

                {{ detail?.product_discount?.reason }}
              </p>
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
                  {{ detail.average_rate || 0 }}
                </span>
              </p>
              <p
                class="text-light400 bg-primary px-3 rounded-full text-sm font-semibold"
              >
                {{ detail.status }}
              </p>
            </div>
            <div class="flex flex-wrap items-end gap-3">
              <p class="text-neutral300" v-if="detail?.quantity">
                Quantity:
                <span class="font-semibold text-dark100">{{
                  detail?.quantity
                }}</span>
              </p>
              <span
                v-if="detail?.quantity === 0"
                class="text-xs font-semibold tex-dark300 px-3 rounded-xl bg-red/50"
                >unavailable</span
              >
              <p class="text-neutral300">
                Minimum Order Quantity:
                <span class="font-semibold text-dark100">{{
                  detail?.min_order || 1
                }}</span>
              </p>
            </div>

            <div class="max-w-md py-4 text-dark300/60">
              <h1 class="font-bold">Stores and Locations of the Product</h1>
              <span class="block"> Store Name : {{ detail?.store?.name }}</span>
              Address:
              <span class="text-sm">
                {{
                  findNameBasedOnLanguage(
                    detail?.store?.sub_city?.region_city?.name?.to,
                    locale
                  )?.name
                }} </span
              >,

              <span class="text-sm">
                {{
                  findNameBasedOnLanguage(
                    detail?.store?.sub_city?.name?.to,
                    locale
                  )?.name
                }}
              </span>
            </div>
          </div>
        </section>
        <aside
          class="bg-light400 bg-opacity-40 rounded py-4 px-6 h-fit md:flex flex-col gap-3 max-w-[16.5rem] hidden"
        >
          <h4 class="font-semibold text-dark100">
            Unit Price
            <span class="font-extrabold text-lg pl-0.5"
              >{{ detail?.selling_price }} ETB</span
            >
          </h4>
          <h4 class="font-semibold text-dark100" v-if="quantity">
            Total Price
            <span class="font-extrabold text-lg pl-0.5"
              >{{ (quantity || 1) * detail?.selling_price }} ETB</span
            >
          </h4>
          <p class="text-neutral300" v-if="detail?.product_discount?.rate">
            <span class="text-primary"
              >{{ detail?.product_discount?.rate }} discount</span
            >, {{ detail?.product_discount?.reason }}
          </p>
          <p class="text-neutral300">
            Minimum Order Quantity:
            <span class="font-semibold text-dark100">{{
              detail?.min_order
            }}</span>
          </p>

          <div class="flex flex-wrap gap-3 items-center justify-center py-2">
            <Icon
              v-for="i in 3"
              :key="i"
              name="mdi:car-sports"
              class="w-8 h-8 bg-purple p-1 text-light400 rounded-full"
            />
          </div>

          <div
            v-if="detail?.quantity > 0"
            class="flex items-center gap-1 my-1.5 border-neutral500 border p-0.5 hover:border-primary rounded-sm w-fit mx-auto"
          >
            <Icon
              @click="($event) => changeQuantity(-1)"
              name="ic:round-minus"
              class="w-[1.65rem] h-[1.65rem] cursor-pointer text-neutral300 hover:text-primary"
            />

            <input
              v-model="quantity"
              type="number"
              placeholder="0"
              class="w-28 outline-none focus:outline-none active:outline-none text-center border-none active:border-none h-7 focus:border-none"
            />

            <Icon
              @click="changeQuantity(1)"
              name="ic:round-plus"
              class="w-[1.65rem] h-[1.65rem] cursor-pointer text-neutral300 hover:text-primary"
            />
          </div>

          <button
            type="button"
            v-if="detail?.quantity > 0"
            :class="[
              cart_addloading ? 'disabled:bg-primary/50' : 'text-light100',
            ]"
            :disabled="cart_addloading"
            @click="addToCart"
            class="inline-block rounded-sm bg-primaryvar1 disabled:cursor-wait px-6 py-2 font-bold leading-normal text-light300 shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primaryvar1 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
          >
            <Icon name="fa6-solid:cart-plus" />
          </button>

          <hr class="m-3" />

          <!-- <h4 class="font-bold text-center text-neutral300">Contacts</h4> -->
          <!-- <div class="flex flex-wrap gap-3 items-center justify-center py-2">
            <Icon name="mdi:facebook" class="w-6 h-6 text-dark200" />
            <Icon name="ri:instagram-fill" class="w-6 h-6 text-dark200" />
            <Icon name="ic:baseline-telegram" class="w-6 h-6 text-dark200" />
            <Icon name="ion:logo-tiktok" class="w-6 h-6 text-dark200" />
            <Icon name="mdi:twitter" class="w-6 h-6 text-dark200" />
            <Icon name="mdi:youtube" class="w-6 h-6 text-dark200" />
          </div>-->
          <!-- <NuxtLink
            :to="{ name: 'account-chat-index-id', params: { id: auth.uid } }"
            class="flex items-center justify-center gap-2 rounded-full bg-primary px-3 py-1.5 font-bold leading-normal text-dark100 transition duration-150 ease-in-out hover:bg-primaryvar1 focus:bg-primaryvar1 focus:outline-none focus:ring-0 active:bg-primary"
          >
            <Icon name="majesticons:chats-2" />
            Start Chat
          </NuxtLink> -->
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
              <div
                class="font-medium text-sm flex items-center gap-6 flex-wrap"
              >
                <p
                  class="flex items-center justify-center gap-1"
                  v-if="detail?.store?.licence"
                >
                  <Icon name="octicon:verified-24" class="text-primary" />
                  licenced (certified)
                </p>
                <p>
                  Main Category:
                  {{ detail.sub_category?.category?.name?.to[0].name }}
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
                  {{ detail?.store?.supplier?.userById?.phone_number }}
                </p>
                <p class="flex items-center justify-center gap-1">
                  <Icon
                    name="heroicons:envelope-20-solid"
                    class="text-primary"
                  />
                  {{ detail?.store?.supplier?.userById?.email }}
                </p>
              </div>
              <!-- <h4 class="md:hidden block font-bold text-center text-neutral300">
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
                /> -->
                {{ detail.store?.supplier }}
                <!-- <Icon name="ion:logo-tiktok" class="w-6 h-6 text-dark200" />
                <Icon name="mdi:twitter" class="w-6 h-6 text-dark200" />
                <Icon name="mdi:youtube" class="w-6 h-6 text-dark200" /> -->
              </div>
              <h3 class="font-semibold">Stores</h3>
              <div class="w-full h-[20rem]">
                <h-geo-location-map
                  :center="{
                    lat: detail?.store?.latitude,
                    lng: detail?.store?.longitude,
                  }"
                  :max-zoom="20"
                  :information="[
                    {
                      lat: detail?.store?.latitude,
                      lng: detail?.store?.longitude,
                      popup: detail?.store,
                    },
                  ]"
                >
                  <template #popup="{ popup }">
                    <div class="text-dark300/80">
                      <h1>Store Name : {{ popup?.name }}</h1>
                      <div>
                        <span>
                          Address
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
                          }}</span
                        >
                      </div>
                      <div>
                        Store Phone : {{ popup?.phone_number }}
                        <div>
                          You Can get Owner using
                          {{ popup?.supplier?.userById?.phone_number }}

                          {{ popup?.supplier?.userById?.email }}
                        </div>
                      </div>
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
                :rateValue="your_rate_commnent?.rate || 0"
              />
              <textarea
                placeholder="Add Comment here"
                v-model="your_comment"
                class="border-[1px] border-primaryvar4 min-h-[1rem] rounded-md"
              />

              <div class="flex justify-end">
                <button
                  @click="postCommentAndRate"
                  class="text-sm font-meduim bg-primaryvar5 px-3 py-1 rounded-md hover:bg-primary1"
                >
                  Post
                </button>
              </div>
              <div
                class="flex flex-row items-center gap-2"
                v-for="com in detail?.comment"
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
                  <h-rating :readonly="true" :rate-value="com?.rate" />
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

    <section v-if="detail?.sub_category?.related_product">
      <h3 class="text-lg text-dark100 font-extrabold pb-1.5">
        Related Products
      </h3>
      <div class="flex flex-wrap gap-4">
        <product-secondary-card
          v-for="product in detail?.sub_category?.related_product"
          :key="product?.id"
          :type="Type.REALTIME"
          :id="product?.id"
          :title="product?.title"
          :quantity="product?.quantity"
          :price="product?.selling_price"
          :status="product?.status"
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
              <span class="font-extrabold text-lg pl-0.5">{{
                detail?.selling_price
              }}</span>
            </h4>
            <h4 class="font-semibold text-dark100" v-if="quantity">
              Total Price
              <span class="font-extrabold text-lg pl-0.5">{{
                detail?.selling_price * quantity
              }}</span>
            </h4>
            <p class="text-neutral300" v-if="detail?.product_discount?.rate">
              <span class="text-primary"
                >{{ detail?.product_discout?.rate }}% discount</span
              >,{{ detail?.product_discount?.reason }}
            </p>
            <p class="text-neutral300">
              Minimum Order Quantity:
              <span class="font-semibold text-dark100">{{
                detail?.min_order
              }}</span>
            </p>

            <div class="flex flex-wrap gap-3 items-center justify-center py-2">
              <Icon
                v-for="i in 3"
                :key="i"
                name="mdi:car-sports"
                class="w-8 h-8 bg-purple p-1 text-light400 rounded-full"
              />
            </div>

            <div
              v-if="detail?.quantity > 0"
              class="flex items-center gap-1 my-1.5 border-neutral500 border p-0.5 hover:border-primary rounded-sm w-fit mx-auto"
            >
              <Icon
                @click="changeQuantity(1)"
                name="ic:round-plus"
                class="w-[1.65rem] h-[1.65rem] cursor-pointer text-neutral300 hover:text-primary"
              />
              <input
                v-model="quantity"
                type="number"
                placeholder="0"
                class="w-28 outline-none focus:outline-none active:outline-none text-center border-none active:border-none h-7 focus:border-none"
              />
              <Icon
                @click="($event) => changeQuantity(-1)"
                name="ic:round-minus"
                class="w-[1.65rem] h-[1.65rem] cursor-pointer text-neutral300 hover:text-primary"
              />
            </div>

            <button
              v-if="detail?.quantity > 0"
              type="button"
              :class="[
                cart_addloading ? 'disabled:bg-primary/50' : 'text-light100',
              ]"
              :disabled="cart_addloading"
              @click="addToCart"
              class="inline-block rounded bg-primaryvar1 px-6 py-2 font-bold leading-normal text-light300 shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primaryvar1 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
            >
              <Icon name="fa6-solid:cart-plus" />
              Add to Cart
            </button>
          </div>
        </template>
      </h-dialog>
    </div>

    <footer
      class="fixed md:hidden left-0 bottom-0 right-0 flex gap-4 items-center justify-start px-4 h-16 bg-light300 shadow-[0px_0px_18px_6px_rgba(130,130,130,0.2)]"
    >
      <!-- <NuxtLink
        :to="{ name: 'account-chat-index-id', params: { id: auth.uid } }"
        class="flex items-center justify-center gap-2 rounded-full bg-primary px-3 py-1.5 font-bold leading-normal text-dark100 transition duration-150 ease-in-out hover:bg-primaryvar1 focus:bg-primaryvar1 focus:outline-none focus:ring-0 active:bg-primary"
      >
        <Icon name="majesticons:chats-2" />
        Start Chat
      </NuxtLink> -->
      <button
        type="button"
        class="inline-block rounded-full bg-primary px-3 py-1.5 font-bold leading-normal text-dark100 transition duration-150 ease-in-out hover:bg-primaryvar1 focus:bg-primaryvar1 focus:outline-none focus:ring-0 active:bg-primary"
      >
        Call to Supplier
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
import update_or_insert_cart from "~/apollo/mutation/product/realtime/add_to_cart.gql";
import product_detail from "~/apollo/query/product/realtime/product_detail.gql";
import your_review from "~/apollo/query/product/realtime/your_review.gql";
import add_rate_comment from "~/apollo/mutation/product/realtime/add_rate_comment.gql";
import { useAuth } from "~/store/auth";
import { useStore } from "~/store/data";
const store = useStore();
const auth = useAuth();
const { locale } = useI18n();
const cart_addloading = ref(false);
const openDropDown = ref(false);
const showDialog = ref(false);
const quantity = ref<number>(0);
const route = useRoute();
const open_notification = ref(false);
const rate = ref(0);
const message = ref("jehrjehrjehr");
const success = ref(false);
const enable_your_review = ref(false);
const your_comment = ref("");

const router = useRouter();
enum Type {
  REALTIME,
  VIRTUAL,
}
watchEffect(() => {
  if (typeof quantity.value === "string") quantity.value = 0;
});

const changeQuantity = (state: number) => {
  if (quantity.value + state < 0 || quantity.value + state > 100) return;
  quantity.value += state;
};

const id = computed(() => {
  return route.params?.id;
});

const your_review_variable = computed(() => {
  return {
    product_id: route.params.id,
    user_id: auth.uid,
  };
});

const {
  result: product_result,
  error: product_error,
  loading: product_loading,
  refetch: refetch_detail,
} = useCustomQuery(product_detail, { id: id.value });

const {
  result: your_review_result,
  error: your_error,
  loading: your_review_loading,
  onResult: onYourRatingResult,
  refetch: refetch_your_review,
} = useCustomQuery(your_review, your_review_variable, 0, enable_your_review);

const {
  mutate: addRateAndComment,
  onDone: onAddCommentAndRate,
  onError: onAddRateAndCommentError,
} = useCustomMutation(add_rate_comment);

watch(
  () => auth.uid,
  (uid) => {
    if (uid) {
      enable_your_review.value = true;
    }
  }
);

watchEffect(() => {
  if (auth.uid) {
    enable_your_review.value = true;
  }
});

const your_rate_commnent = computed(() => {
  return your_review_result.value?.review;
});

watch(your_rate_commnent, (comment) => {
  if (comment) {
    your_comment.value = comment?.comment;
  }
});

onYourRatingResult((result) => {
  console.log(result?.data);
});

const {
  mutate: insert_cart,
  onDone: onInsertCart,
  onError: onErrorCart,
} = useCustomMutation(update_or_insert_cart);

onInsertCart((result) => {
  cart_addloading.value = false;
  open_notification.value = true;
  message.value = "Successfully add to Cart";
  success.value = true;
});
onErrorCart((error) => {
  cart_addloading.value = false;
  open_notification.value = true;
  message.value = error.message;
  success.value = false;
});

const postCommentAndRate = () => {
  if (auth?.uid) {
    if (rate.value && your_comment.value) {
      addRateAndComment({
        object: {
          comment: your_comment.value,
          rate: rate.value,

          product_id: route?.params?.id,
          user_id: auth?.uid,
        },
        onconflict: {
          constraint: "physical_product_rate_pkey",
          update_columns: ["comment", "rate"],
        },
      });
    } else if (rate.value) {
      addRateAndComment({
        object: {
          rate: rate.value,
          product_id: route?.params?.id,
          user_id: auth?.uid,
        },
        onconflict: {
          constraint: "physical_product_rate_pkey",
          update_columns: ["rate"],
        },
      });
    } else if (your_comment.value) {
      addRateAndComment({
        object: {
          comment: your_comment.value,
          product_id: route?.params?.id,
          user_id: auth?.uid,
        },
        onconflict: {
          constraint: "physical_product_rate_pkey",
          update_columns: ["comment"],
        },
      });
    }
  } else {
    router.push({ name: "auth-signIn" });
  }
};

onAddCommentAndRate((result) => {
  refetch_your_review();
  refetch_detail();
  cart_addloading.value = false;
  open_notification.value = true;
  message.value = "Successfully add Review";
  success.value = true;
});

onAddRateAndCommentError((error) => {
  cart_addloading.value = false;
  open_notification.value = true;
  message.value = error.message;
  success.value = false;

  console.log(error);
});

const addToCart = () => {
  if (auth.uid) {
    if (
      quantity.value >= detail.value?.min_order &&
      quantity.value <= detail.value?.quantity
    ) {
      cart_addloading.value = true;
      insert_cart({
        object: {
          customer_id: auth.uid,
          income_quantity: quantity.value,
          p_id: route.params?.id,
        },
      });
    } else {
      open_notification.value = true;
      message.value =
        "your Cart Should Be in Between" +
        detail.value?.min_order +
        " and " +
        detail.value?.quantity;
      success.value = false;
    }
  } else {
    router.push({ name: "auth-signIn" });
  }
};

const detail = computed(() => {
  return product_result.value?.product.length > 0
    ? product_result.value?.product[0]
    : null;
});

const updateRate = (value) => {
  rate.value = value;
};

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
  const categorysub = store
    ?.getPhysicalProductSubCategory(locale.value)
    .find((element) => {
      return value?.id == element?.id;
    });

  const category = store
    ?.getPhysicalProductCategory(locale.value)
    ?.find((cat) => {
      return categorysub?.category_id == cat?.id;
    });

  router.push({
    name: "products-category-name-id-sub-category-sub_name-sub_id",
    params: {
      sub_id: value?.id,
      sub_name: value?.name,
      name: category?.name[0]?.name,
      id: category?.id,
    },
  });
};

useHead({
  title: "Products",
});

definePageMeta({
  layout: "custom",
});
</script>

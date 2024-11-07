<template>
  <main class="mt-5">
    <!-- Modal toggle -->

    <!-- Main modal -->
    <div
      v-if="show_modal"
      id="authentication-modal"
      tabindex="-1"
      aria-hidden="true"
      class="fixed top-0 left-0 right-0 z-50 flex items-center justify-center bg-black/50 w-full p-4 overflow-y-auto md:inset-0 h-[calc(100vh-1rem)] max-h-full"
    >
      <div class="relative w-full bg-black max-w-md max-h-full">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <button
            type="button"
            class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
            data-modal-hide="authentication-modal"
          >
            <svg
              aria-hidden="true"
              class="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
          <div class="px-6 py-6 lg:px-8">
            <h1 class="text-xl font-semibold text-primary">
              Give Comment and Rating For this order and Delivery
            </h1>
            <div class="space-y-6">
              <div>
                <span>Rating</span>
                <h-rating :readonly="false" @update="updateRateHandler" />
              </div>

              <div class="flex flex-col">
                <div class="flex items-start flex-col gap-3">
                  <div class="flex w-full flex-col">
                    <label for="comment">Comment</label>
                    <textarea
                      id="comment"
                      v-model="comment"
                      class="border h-[3rem] w-full border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                      required
                    />
                  </div>
                  <button
                    @click="handleReview"
                    class="text-sm bg-primary mx-auto font-medium px-3 rounded-md text-light200 dark:text-gray-300"
                  >
                    Post
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <h-notification
      :success="success"
      :message="message"
      v-model="show_notification"
    />
    <h-loading :showLoading="onFetchProductLoading"></h-loading>
    <h-tab
      @activeTabNameChange="handleTabChange"
      :tabs="tabs as []"
      tabs-class="sticky z-40 top-[3.7rem] left-0 right-0 pt-1 justify-center"
    >
      <template #pending>
        <section class="flex flex-col gap-4 px-3 xs:mt-8 mt-12">
          <h3 class="self-center"></h3>
          <div class="flex relative lg:flex-row flex-col-reverse gap-4">
            <div
              class="h-fit flex-1 sm:min-w-[24rem] min-w-full grid lg:grid-cols-1 md:grid-cols-2 gap-4"
            >
              <h-empty
                v-if="orders.length === 0"
                content="No Data Available😥"
              ></h-empty>
              <div
                v-else
                v-for="order in orders"
                :key="order.id"
                @click="
                  ($event) => {
                    selected_order = order;
                    controller.showBottomSheet = true;
                  }
                "
                class="flex h-fit rounded shadow-sm items-center cursor-pointer justify-start transition-colors ease-in-out duration-300"
                :class="[
                  selected_order?.id === order?.id
                    ? 'lg:bg-primary bg-neutral300'
                    : 'hover:bg-primaryvar3 bg-neutral300',
                ]"
              >
                <p
                  class="font-semibold px-1.5 flex items-center justify-center text-light400"
                  title="Expand"
                  git
                  pu
                >
                  <Icon name="mdi:progress-check" class="w-7 h-7" />
                </p>
                <div
                  class="px-2.5 py-1.5 flex bg-light400 rounded-r-sm flex-auto items-start justify-between gap-8"
                >
                  <div>
                    <h3 class="font-extrabold mb-1.5 rounded text-primary">
                      {{ order?.id }}
                    </h3>
                    <!-- <h4 class="font-semibold text-md text-neutral300">
                      {{
                        order.order_details[0]?.physical_product?.store?.name
                      }}
                    </h4> -->
                    <p class="font-medium text-sm text-neutral300">
                      {{
                        order?.shipping_address?.sub_city.region_city
                          ?.original_language.translation_contents[1].name
                      }},
                      <span class="text-xs font-medium">
                        {{
                          order?.shipping_address?.sub_city?.original_language
                            ?.translation_contents[1]?.name
                        }}
                      </span>
                    </p>
                  </div>
                  <div class="flex flex-col items-end">
                    <h2 class="font-extrabold text-lg text-neutral300">
                      <!-- {{ getTotalPrice(order.order_details) }} {{ $t("etb") }} -->
                    </h2>
                    <h4 class="font-semibold text-sm text-neutral300">
                      {{ formatDateUtils(order.created_at) }}
                    </h4>
                  </div>
                </div>
              </div>
            </div>

            <div
              class="hidden lg:block w-full lg:w-[50%]"
              v-if="!selected_order && orders?.length > 0"
            >
              Select Order To view Each order detail in and Associated product
            </div>

            <div class="" v-if="selected_order">
              <order-detail
                @get-scanned-value="handleUpdate"
                v-model:showBottomSheet="controller.showBottomSheet"
                :order="selected_order"
                ref="bottomSheetTarget"
                orderType="PENDING"
              />
            </div>
          </div>
        </section>
      </template>

      <template #completed>
        <section class="flex flex-col gap-4 px-3 xs:mt-8 mt-12">
          <h3 class="self-center"></h3>
          <div class="flex relative lg:flex-row flex-col-reverse gap-4">
            <div
              class="h-fit flex-1 sm:min-w-[24rem] min-w-full grid lg:grid-cols-1 md:grid-cols-2 gap-4"
            >
              <h-empty
                v-if="orders.length === 0"
                content="No Data Available😥"
              ></h-empty>

              <div
                v-else
                v-for="order in orders"
                :key="order.created_at"
                @click="
                  ($event) => {
                    selected_order = order;
                    controller.showBottomSheet = true;
                  }
                "
                class="flex h-fit rounded shadow-sm items-center cursor-pointer justify-start transition-colors ease-in-out duration-300"
                :class="[
                  order?.id === selected_order?.id
                    ? 'lg:bg-primary bg-neutral300'
                    : 'hover:bg-primaryvar3 bg-neutral300',
                ]"
              >
                <p
                  class="font-semibold px-1.5 flex items-center justify-center text-light400"
                  title="Expand"
                  git
                  pu
                >
                  <Icon name="mdi:progress-check" class="w-7 h-7" />
                </p>
                <div
                  class="px-2.5 py-1.5 flex bg-light400 rounded-r-sm flex-auto items-start justify-between gap-8"
                >
                  <div>
                    <h3 class="font-extrabold mb-1.5 rounded text-primary">
                      {{ order?.order_details[0]?.order_id }}
                    </h3>
                    <h4 class="font-semibold text-md text-neutral300">
                      <!-- {{
                        order?.order_details[0]?.physical_product?.store.name
                      }} -->
                    </h4>
                    <p class="font-medium text-sm text-neutral300">
                      {{
                        order?.shipping_address?.sub_city?.region_city
                          .original_language.translation_contents[1].name
                      }},
                      <span class="text-xs font-medium">
                        {{
                          order?.shipping_address?.sub_city?.original_language
                            ?.translation_contents[1].name
                        }}
                      </span>
                    </p>
                  </div>
                  <div class="flex flex-col items-end">
                    <h2 class="font-extrabold text-lg text-neutral300">
                      <!-- {{ getTotalPrice(order.order_details) }} {{ $t("etb") }} -->
                    </h2>
                    <h4 class="font-semibold text-sm text-neutral300">
                      {{ formatDateUtils(order.created_at) }}
                    </h4>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="hidden lg:block w-full lg:w-[50%]"
              v-if="!selected_order && orders?.length > 0"
            >
              Select The Order In Order to each Each And Every order detail
            </div>
            <div class="" v-if="selected_order">
              <order-detail
                v-model:showBottomSheet="controller.showBottomSheet"
                :order="selected_order"
                ref="bottomSheetTarget"
                orderType="COMPLETED"
              />
            </div>
          </div>
        </section>
      </template>

      <template #delivered>
        <section class="flex flex-col gap-4 px-3 xs:mt-8 mt-12">
          <h3 class="self-center"></h3>
          <div class="flex relative lg:flex-row flex-col-reverse gap-4">
            <div
              class="h-fit flex-1 sm:min-w-[24rem] min-w-full grid lg:grid-cols-1 md:grid-cols-2 gap-4"
            >
              <h-empty
                v-if="orders.length === 0"
                content="No Data Available😥"
              ></h-empty>
              <div
                v-else
                v-for="order in orders"
                :key="order.created_at"
                @click="
                  ($event) => {
                    selected_order = order;
                    controller.showBottomSheet = true;
                  }
                "
                class="flex h-fit rounded shadow-sm items-center cursor-pointer justify-start transition-colors ease-in-out duration-300"
                :class="[
                  selected_order?.id === order?.id
                    ? 'lg:bg-primary bg-neutral300'
                    : 'hover:bg-primaryvar3 bg-neutral300',
                ]"
              >
                <p
                  class="font-semibold px-1.5 flex items-center justify-center text-light400"
                  title="Expand"
                  git
                  pu
                >
                  <Icon name="mdi:progress-check" class="w-7 h-7" />
                </p>
                <div
                  class="px-2.5 py-1.5 flex bg-light400 rounded-r-sm flex-auto items-start justify-between gap-8"
                >
                  <div>
                    <h3 class="font-extrabold mb-1.5 rounded text-primary">
                      {{ order?.id }}
                    </h3>
                    <h4 class="font-semibold text-md text-neutral300">
                      <!-- {{ order?.order_details[0]?.physical_product.store.name }} -->
                    </h4>
                    <p class="font-medium text-sm text-neutral300">
                      {{
                        order?.shipping_address?.sub_city?.region_city
                          ?.original_language.translation_contents[1].name
                      }},
                      <span class="text-xs font-medium">
                        {{
                          order?.shipping_address?.sub_city?.original_language
                            ?.translation_contents[1].name
                        }}
                      </span>
                    </p>
                  </div>
                  <div class="flex flex-col items-end">
                    <h2 class="font-extrabold text-lg text-neutral300">
                      <!-- {{ getTotalPrice(order.order_details) }} {{ $t("etb") }} -->
                    </h2>
                    <h4 class="font-semibold text-sm text-neutral300">
                      {{ formatDateUtils(order.created_at) }}
                    </h4>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="hidden lg:block w-full lg:w-[50%]"
              v-if="!selected_order && orders?.length > 0"
            >
              Select Order To view Each order detail in and Associated product
            </div>

            <div class="" v-if="selected_order">
              <order-detail
                v-model:showBottomSheet="controller.showBottomSheet"
                :order="selected_order"
                ref="bottomSheetTarget"
                orderType="DELIVERED"
              />
            </div>
          </div>
        </section>
      </template>
    </h-tab>
  </main>
</template>
<script setup lang="ts">
import { useAuth } from "~~/store/auth";
import fetchProductOrderBySupplier from "@/apollo/query/account/fetchOrders.gql";
import useCustomQuery from "~~/composables/useCustomQuery";
import updateorder from "~/apollo/mutation/order/update_order_status.gql";
import updateMainOrderGQL from "~/apollo/mutation/order/update_order.gql";
import { onClickOutside } from "@vueuse/core";
import { computed } from "@vue/reactivity";
const selected_tab = ref(["pending", "picked", "unpaid"]);
const selected_order: any = ref(null);
const searchString = ref("");
const success = ref(false);
const show_notification = ref(false);
const message = ref("");
const comment = ref("");
const rate = ref(0);
const show_modal = ref(false);
const for_review_pop_up = ref(false);
const order_id_value = ref(null);
const checker_id = ref(null);

const getTotalPrice = (
  input: {
    unit_price: number;
    quantity: number;
    discount: number;
    special_discount_rate: number | number;
  }[]
) => {
  let price = 0;

  input.forEach((product) => {
    price +=
      (product.unit_price - (product.discount ? product.discount : 0)) *
      (1 -
        (product.special_discount_rate ? product.special_discount_rate : 0)) *
      product.quantity;
  });

  return price;
};

const { uid } = useAuth();
const variable = computed(() => {
  return {
    where: {
      // ...(searchString.value
      //   ? {
      //       _or: [
      //         { delivery_provider: { name: { _iregex: searchString.value } } },
      //         {
      //           user: {
      //             _or: [
      //               { first_name: { _iregex: searchString.value } },
      //               { last_name: { _iregex: searchString.value } },
      //             ],
      //           },
      //         },
      //       ],
      //     }
      //   : {}),

      order_details: { status: { _in: selected_tab.value } },
      with_delivery: { _eq: true },
      user: { id: { _eq: uid } },
    },
  };
});

const activeTabOrders = ref<
  Array<{
    customer_id: string;

    user: {
      first_name: string;
      last_name: string;
    };
    shipping_address: {
      longitude: number;
      latitude: number;
      state_provinence: string;
      sub_city: {
        original_language: {
          translation_contents: { name: string }[];
        };
        region_city: {
          original_language: {
            translation_contents: { name: string }[];
          };
        };
      };
    };
    with_delivery: boolean;
    transaction_key: string;
    created_at: string;
    delivery_provider: {
      name: string;
    };
    order_details: {
      status: string;
      order_id: string;
      unit_price: number;
      quantity: number;
      discount: number;
      special_discount_rate: number | number;
      physical_product: {
        id: number;
        title: string;
        store: {
          name: string;
        };
      };
    }[];
  }>
>([]);

const orders = ref<
  Array<{
    customer_id: string;
    id: number;
    user: {
      first_name: string;
      last_name: string;
    };
    shipping_address: {
      longitude: number;
      latitude: number;
      state_provinence: string;
      sub_city: {
        original_language: {
          translation_contents: { name: string }[];
        };
        region_city: {
          original_language: {
            translation_contents: { name: string }[];
          };
        };
      };
    };
    with_delivery: boolean;
    transaction_key: string;
    created_at: string;
    delivery_provider: {
      name: string;
    };
    order_details: {
      status: string;
      order_id: string;
      unit_price: number;
      quantity: number;
      discount: number;
      special_discount_rate: number | number;
      physical_product: {
        id: number;
        title: string;
        status: string;
        store: {
          id: number;
          name: string;
        };
      };
    }[];
  }>
>([]);
const {
  mutate: updateOrder,
  onDone: onDoneUpdating,
  onError: onErrorUpdateting,
} = useCustomMutation(updateorder);
const {
  mutate: updateMainOrder,
  onDone: onDoneUpdatingMainOrder,
  onError: onErrorMainOrder,
} = useCustomMutation(updateMainOrderGQL);

const {
  onResult: onFetchProductOrderResult,
  onError: onFetchProductOrderError,
  loading: onFetchProductLoading,
  refetch: refetchOrder,
} = useCustomQuery(fetchProductOrderBySupplier, variable);

onFetchProductOrderResult((result) => {
  orders.value = result.data.product_order;
});

const handleUpdate = (value: any) => {
  const splited_data = value.split("%$#@$%");
  const order_id = parseInt(splited_data.slice(1));
  console.log(order_id);
  order_id_value.value = order_id;

  if (order_id == selected_order.value?.id) {
    updateMainOrder({
      where: {
        id: { _eq: order_id },
      },
      set: {
        status: "delivered",
      },
    });
    updateOrder({
      where: {
        order_id: { _eq: order_id },
      },
      set: {
        status: "delivered",
      },
    });
  } else {
    success.value = false;
    show_notification.value = true;
    message.value =
      "It is not the Correct Order please choose and try the appropriate";
  }
};

onFetchProductOrderError((error) => {
  console.log({ error });
});

const currentTab = ref("pending");

const tabs = computed(() => [
  {
    text: "pending",
    icon: "mdi:progress-check",
  },
  {
    text: "completed",
    icon: "uil:check-circle",
  },
  {
    text: "delivered",
    icon: "mdi:progress-close",
  },
]);

const controller = ref<{ activeOrder: any; showBottomSheet: boolean }>({
  activeOrder: null,
  showBottomSheet: false,
});

const bottomSheetTarget = ref(null);
onClickOutside(bottomSheetTarget, (event) => {
  controller.value.showBottomSheet = false;
});

definePageMeta({
  validate: (route) => {
    const { token } = useAuth();
    if (token) return true;
    else return false;
  },
});

// const displayLoading = ref(true);
const handleTabChange = (tabSelected: string) => {
  currentTab.value = tabSelected;
  if (tabSelected === "pending")
    selected_tab.value = ["pending", "unpaid", "picked"];
  else if (tabSelected === "completed") {
    selected_tab.value = ["completed"];
  } else if (tabSelected === "delivered") {
    selected_tab.value = ["delivered"];
  }

  selected_order.value = "";

  if (orders.value) {
    activeTabOrders.value = orders.value.filter((order) => {
      if (tabSelected === "pending") {
        let isAtLeastOnePending = false;
        order.order_details.forEach((o_detail) => {
          if (o_detail.status === tabSelected) {
            isAtLeastOnePending = true;
            return;
          }
        });

        return isAtLeastOnePending ? true : false;
      }
      if (tabSelected === "completed") {
        let isAllCompleted = true;
        if (order.order_details.length === 0) {
          isAllCompleted = false;
        } else
          order.order_details.forEach((o_detail) => {
            if (o_detail.status !== tabSelected) {
              isAllCompleted = false;
              return;
            }
          });

        if (isAllCompleted) return order.order_details;
        else return false;
      }

      if (tabSelected === "canceled") {
        let isAllCanceled = true;
        if (order.order_details.length === 0) {
          isAllCanceled = false;
        } else
          order.order_details.forEach((o_detail) => {
            if (o_detail.status !== "cancel") {
              isAllCanceled = false;
              return;
            }
          });

        if (isAllCanceled) return order.order_details;
        else return false;
      }
    });

    controller.value.activeOrder = activeTabOrders.value[0];
    console.log("Bisbila", controller.value.activeOrder);

    // displayLoading.value = false;
  }
};

onDoneUpdating((result) => {
  console.log("updated");
  refetchOrder();
  success.value = true;
  show_notification.value = true;
  message.value = "Your Operation Scanned Successfully";
  if (for_review_pop_up.value) {
    for_review_pop_up.value = false;
  } else {
    show_modal.value = true;
    for_review_pop_up.value = true;
  }
});

onErrorUpdateting((error) => {
  success.value = false;
  show_notification.value = true;
  message.value = "Oops Please Try again";
});

const handleReview = () => {
  if (rate?.value && comment?.value) {
    updateMainOrder({
      where: {
        id: { _eq: order_id_value.value },
      },
      set: {
        driver_rate: rate.value,
        driver_comment: comment.value,
      },
    });
  } else {
    success.value = false;
    show_notification.value = true;
    message.value = "Please fill the Form properly";
  }
};

onDoneUpdatingMainOrder((result) => {
  show_modal.value = false;
  success.value = true;
  show_notification.value = true;
  message.value = "success";
  console.log(result);
});
onErrorMainOrder((error) => {
  success.value = false;
  show_notification.value = true;
  message.value = error.name;
});

const updateRateHandler = (value) => {
  rate.value = value;
};

useHead({
  title: "Orders",
});

definePageMeta({
  layout: "custom",
});
</script>

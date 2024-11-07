<template>
  <div
    v-if="order"
    :class="[showBottomSheet ? 'top-[3.5rem]' : 'top-full']"
    class="flex-1 lg:drop-shadow-none drop-shadow-2xl lg:min-w-[calc(100%-25rem)] lg:overflow-y-hidden overflow-y-auto flex lg:static fixed lg:z-0 z-40 left-0 right-0 bottom-0 flex-col gap-6 bg-light400 lg:bg-opacity-50 lg:rounded rounded-2xl p-4 transition-all ease-in-out duration-500"
  >
    <div
      class="lg:hidden flex items-center justify-between sticky top-0 w-full left-2 right-2"
    >
      <h3 class="font-bold text-lg text-neutral300">{{ order?.orderId }}</h3>
      <Icon
        name="solar:close-circle-bold-duotone"
        @click="
          () => {
            $emit('update:showBottomSheet', false);
          }
        "
        class="w-8 h-8 text-neutral300 cursor-pointer hover:text-red"
      />
    </div>

    <div class="flex 2xl:flex-row flex-col items-start gap-6">
      <div v-if="orderType == OrderType.PENDING">
        <button
          class="text-sm font-semibold bg-primary px-3 py-1 rounded-md"
          v-if="!scan"
          @click.stop="scanIt"
        >
          Scan
        </button>
        <div class="w-full relative bg-light200">
          <Icon
            name="uil:x"
            v-if="scan"
            class="text-red w-[3rem] h-[3rem] absolute z-50 -top-7 -right-8"
            @click="scan = false"
          />
          <h-grcode_reader v-if="scan" @getScannedValue="getScannedValue" />
        </div>
      </div>

      <div class="flex-1 flex flex-col gap-8">
        <div
          class="grid xl:grid-cols-2 lg:grid-cols-1 md:grid-cols-2 grid-cols-1 items-center gap-x-8 gap-y-4 flex-wrap"
        >
          <p
            class="space-x-1 text-dark200"
            v-for="data in detailData"
            :key="data.key"
          >
            <Icon name="ic:twotone-playlist-add-check-circle" />
            <span class="font-bold">{{ data.key }}:</span>
            {{ data.value || "-" }}
          </p>
          <div class="flex flex-row gap-3 items-center">
            <Icon
              name="uil:money-stack"
              class="text-primary text-lg font-bold"
            />
            <span class="text-lg font-bold text-primary"
              >Total {{ total_price.toFixed(2) }} ETB</span
            >
          </div>
        </div>
        <div v-if="order?.shipping_address">
          <h3 class="font-bold text-dark200">
            City:
            {{
              order?.shipping_address?.sub_city?.region_city?.original_language
                ?.translation_contents[1]?.name
            }}
          </h3>
          <h4 class="font-semibold text-neutral300 text-md">
            Sub-city:
            {{
              order?.shipping_address?.sub_city?.original_language
                ?.translation_contents[1]?.name
            }}
          </h4>
        </div>
        <p class="w-full bg-light300 h-fit p-2 rounded border-l-8 border-red">
          {{ $t("order_notice_message") }}
        </p>
      </div>
    </div>

    <div class="flex flex-col h-full">
      <div class="flex items-center gap-2">
        <h1 class="font-bold text-lg text-neutral300">
          {{ $t("order_detail") }}
        </h1>
        <hr class="flex-1 border-[1.5px] rounded-full border-light200" />
      </div>
      <h-table
        :headers="header"
        :body="body"
        header-class="bg-light400 text-neutral200 py-2 border-b"
        body-class="py-3 border-b-2  border-light300 border-opacity-100 font-bold text-neutral300"
      >
        <template #id="{ item }">
          {{ item.id }}
        </template>
        <template #product_name="{ item }">
          {{ item.product_name }}
        </template>
        <template #unit_price(ETB)="{ item }">
          {{ item.unit_price }}
        </template>
        <template #quantity="{ item }">
          {{ item.quantity }}
        </template>
        <template #discount(ETB)="{ item }">
          {{ item.discount }}
        </template>
        <template #special_discount_rate(%)="{ item }">
          {{ item.special_discount_rate }}
        </template>
        <template #product_status="{ item }">
          {{ item.product_status }}
        </template>
        <template #order_status="{ item }">
          {{ item.status }}
        </template>
      </h-table>
    </div>
  </div>
</template>
<script setup lang="ts">
enum OrderType {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  DELIVERED = "DELIVERED",
}
interface Input {
  showBottomSheet: boolean;
  orderType: "PENDING" | "COMPLETED" | "UNPAID";
  order: any;
}

const props = defineProps<Input>();

const emits = defineEmits(["update:showBottomSheet", "getScannedValue"]);

const detailData = computed(() =>
  props?.order
    ? [
        {
          key: "Order Id",
          value: props?.order?.order_details[0]?.order_id,
        },
        {
          key: "Date",
          value: formatDateUtils(props.order.created_at),
        },
        {
          key: "Store",
          value: props.order?.order_details[0]?.physical_product.store.name,
        },
        {
          key: "Delivery Service Name",
          value: props.order?.delivery_provider?.name,
        },

        {
          key: "Delivery Type",
          value: props.order.with_delivery ? "With Delivery" : "Self PickUp",
        },
        {
          key: "Payment",
          value: "Chapa",
        },
      ]
    : []
);

const scan = ref(false);

const total_price = ref(0);
// dummy data
const header = [
  "id",
  "product_name",
  "product_status",
  "unit_price(ETB)",
  "quantity",
  "discount(ETB)",
  "special_discount_rate(%)",
  "order_status",
];

const body = computed(() =>
  props.order?.order_details?.map((order_detail: any) => {
    const selling_price =
      order_detail?.unit_price - (order_detail.discount || 0);
    const special_discount_rate = order_detail.special_discount_rate || 0;

    const subtotal =
      order_detail.quantity *
      (selling_price * (1 - special_discount_rate / 100));
    total_price.value += subtotal;
    console.log(subtotal);
    return {
      id: order_detail.id,
      product_name: order_detail.physical_product.title,
      product_status: order_detail?.physical_product?.status,
      status: order_detail?.status,

      unit_price: order_detail.unit_price,
      discount: order_detail.discount,
      quantity: order_detail.quantity,
      special_discount_rate: order_detail.special_discount_rate
        ? order_detail.special_discount_rate / 100
        : "-",
    };
  })
);

const body2 = [
  {
    id: 1,
    product_name: "hibirlink",
    unit_price: "hibirlink@gmail.com",
    discount: "0912445656",
    quantity: "hibirlink",
  },
  {
    id: 2,
    product_name: "hibirlink",
    unit_price: "hibirlink@gmail.com",
    discount: "0912445656",
    quantity: "hibirlink",
  },
  {
    id: 3,
    product_name: "hibirlink",
    unit_price: "hibirlink@gmail.com",
    discount: "0912445656",
    quantity: "hibirlink",
  },
  {
    id: 4,
    product_name: "hibirlink",
    unit_price: "hibirlink@gmail.com",
    discount: "0912445656",
    quantity: "hibirlink",
  },
];

const scanIt = () => {
  scan.value = true;
};

const getScannedValue = (value: any) => {
  emits("getScannedValue", value);
};
</script>

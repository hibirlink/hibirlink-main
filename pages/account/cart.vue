<template>
  <main class="w-full h-full max-w-[90rem] mx-auto px-5">
    <h-notification
      @close="notification.show = false"
      :success="notification.status"
      v-model="notification.show"
    >
      {{ notification.content }}
    </h-notification>

    <h-bread-crumb />

    <section class="w-full h-full flex lg:flex-row flex-col gap-8">
      <div class="flex-auto flex flex-col gap-6">
        <h2
          class="font-bold text-base md:text-lg text-neutral200 bg-light400 px-3 py-3 rounded-md bg-opacity-50"
        >
          Items in Cart
        </h2>

        <div v-if="loading" class="w-full h-full space-y-4">
          <h-skeleton-loader v-for="i in 5" :key="i">
            <div class="flex gap-4 w-full">
              <div class="w-36 h-37 rounded bg-neutral500"></div>
              <div class="space-y-2 flex-1">
                <div class="w-2/4 h-6 rounded bg-neutral500"></div>
                <div class="w-3/4 h-6 rounded bg-neutral500"></div>
                <div class="w-full h-6 rounded bg-neutral500"></div>
                <div class="w-4/6 h-6 rounded bg-neutral500"></div>
                <div class="w-full h-6 rounded bg-neutral500"></div>
              </div>
            </div>
          </h-skeleton-loader>
        </div>

        <div v-else class="w-full h-full space-y-4">
          <account-cart
            v-for="(cart, i) in carts"
            :key="i"
            :cart="cart"
            @notify="handleNotify"
            @deletecart="
              () => {
                refetch();
                updatePrice();
              }
            "
            @updatequantity="
              () => {
                updatePrice();
              }
            "
          />
        </div>
      </div>

      <div
        class="lg:w-2/5 w-full h-fit bg-light400 bg-opacity-50 gap-4 flex flex-col p-4 rounded-xl"
      >
        <h3 class="text-neutral200 text-base md:text-lg font-bold">
          Cart total
        </h3>
        <div class="flex items-center justify-between text-neutral100">
          <div>
            <h4 class="font-semibold">Item(s) Payable</h4>
            <p class="text-sm">(excluding transaction fee and tax)</p>
          </div>
          <h3 class="font-extrabold text-neutral200">{{ payable }} ETB</h3>
        </div>
        <div class="flex items-center justify-between text-neutral100">
          <h4 class="font-semibold">Transaction Fee</h4>
          <h3 class="font-extrabold text-neutral200">3%</h3>
        </div>
        <hr class="border-lemon border-opacity-20" />

        <div class="flex items-center justify-between text-dark100">
          <div>
            <h4 class="font-semibold">Item(s) Total Payable</h4>
            <p class="text-sm">(including transaction fee and tax)</p>
          </div>
          <h3 class="font-extrabold">{{ totalPayable }} ETB</h3>
        </div>

        <button
          type="button"
          @click="($event) => mutate({ userId: store.uid })"
          class="inline-block text-center rounded-full bg-primaryvar1 px-6 py-2 font-bold leading-normal text-light300 shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primaryvar1 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
        >
          <Icon
            name="material-symbols:shopping-cart-checkout-outline-rounded"
          />
          Checkout
        </button>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import get_cart from "~/apollo/query/account/cart.gql";
import cart_payable from "~/apollo/query/account/payable.gql";
import check_cart from "~/apollo/mutation/account/check_cart.gql";
import { useAuth } from "~~/store/auth";

type NotificationType = {
  show?: boolean;
  status?: boolean;
  content?: string;
};
const notification = reactive({
  show: false,
  status: false,
  content: "notification",
});

const handleNotify = (show: boolean, status: boolean, content: string) => {
  notification.show = show;
  notification.status = status;
  notification.content = content;
};

const store = useAuth();
const router = useRouter();
const { refetch, error, result, loading } = useCustomQuery(get_cart, {
  userId: store.uid,
});
const carts = computed(() => result.value?.cart);
const getProductPrice = (cart: any): number => {
  let price: number = cart?.product?.unit_price;
  if (cart?.product?.discount) {
    price -= cart?.product?.discount;
  }
  if (cart?.product?.special_discount) {
    price *= 1 - cart?.product?.special_discount?.rate / 100;
  }
  return price;
};

const {
  refetch: updatePrice,
  result: priceResult,
  loading: priceLoading,
  error: priceError,
} = useCustomQuery(cart_payable, { userId: store.uid });

const payable = computed(() => priceResult.value?.user?.total_price ?? 0);
const totalPayable = computed(() => payable.value + payable.value * 0.03);

const { mutate, onDone, onError } = useCustomMutation(check_cart);
onDone(({ data }) => {
  router.push({ name: "account-checkout-and-pay" });
});
onError((error) => {
  notification.show = true;
  notification.status = false;
  notification.content =
    "Please cross check your cart! It might contain a Qt less or more than allowed.";
});

useHead({
  title: "Cart",
});

definePageMeta({
  layout: "custom",
  middleware: "before-entry",
});
</script>

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

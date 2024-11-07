<template>
  <div
    class="bg-light400 rounded-xl bg-opacity-50 flex flex-col justify-center gap-4 p-4"
  >
    <div class="flex items-top gap-4">
      <h-dialog
        title="Are you sure you want to remove this item from your cart?"
        titleClass="text-neutral200 font-bold"
        :hideClosIcon="true"
        v-model="showDialog"
      >
        <template #content>
          <div class="w-full flex justify-end items-center gap-4 pt-6">
            <h-button
              type="button"
              btn-name="no"
              @click="handleDeleteCart(false)"
              class="w-fit"
              :gradient="false"
              rounded-class="rounded-md"
              btn-class="overflow-hidden border-2 border-dark200 text-dark200 hover:bg-dark200 hover:text-light400"
              btn-name-class="font-bold w-16"
            />
            <h-button
              type="button"
              btn-name="yes"
              @click="handleDeleteCart(true)"
              class="w-fit"
              :gradient="false"
              rounded-class="rounded-md"
              btn-class="overflow-hidden border-2 border-red text-red hover:bg-red hover:text-light400"
              btn-name-class="font-bold w-16"
            />
          </div>
        </template>
      </h-dialog>
      <nuxt-img
        :src="cart?.product?.cover_image"
        format="webp"
        loading="lazy"
        quality="100"
        fit="inside"
        class="min-w-[6rem] h-24 rounded-md group-hover:scale-125 overflow-hidden transition-all ease-in-out duration-500"
      />
      <div class="flex-1 flex flex-col">
        <h3 class="text-dark100 font-bold">
          {{ cart?.product?.title }}
        </h3>
        <h5 class="text-gray font-medium text-md text-neutral300">
          {{
            cart?.product?.subcat?.cat?.lang?.content[Number(locale == "am")]
              ?.name
          }}
          /
          {{
            cart?.product?.subcat?.lang?.content[Number(locale == "am")]?.name
          }}
        </h5>
        <div class="flex flex-wrap items-end gap-3 text-md">
          <h1 class="text-dark100 font-bold">
            {{ getProductPrice(cart) }}
            {{ cart?.product?.price_type }} / Unit
          </h1>
          <h1
            class="text-neutral400 font-bold line-through"
            v-if="cart?.product?.discount"
          >
            {{ cart?.product?.unit_price }}
            {{ cart?.product?.price_type }} / Unit
          </h1>
          <p class="text-neutral300" v-if="cart?.product?.special_discount">
            <span class="text-primary font-bold"
              >{{ cart?.product?.rate }}% off</span
            >, {{ cart?.product?.reason }} 'special discount'
          </p>
        </div>
        <p class="text-neutral300 text-md">
          Quantity:
          <span class="font-semibold text-dark100">{{
            cart?.product?.quantity
          }}</span>
          <span> - </span>
          Minimum Order Quantity:
          <span class="font-semibold text-dark100">{{
            cart?.product?.min_order
          }}</span>
        </p>
        <div
          class="flex-1 py-0.5 flex sm:items-end items-start justify-between mt-2 gap-3 sm:flex-row flex-col"
        >
          <h4 class="text-dark100 space-x-1">
            <span class="font-bold"
              >{{ getProductPrice(cart) * quantity }}
              {{ cart?.product?.price_type }}</span
            >
            / Total,
            <span class="font-bold">{{ quantity }}</span> Pices
          </h4>
          <div
            :class="[
              quantityError
                ? 'border-red hover:border-red'
                : 'border-neutral500 hover:border-primary',
            ]"
            class="flex items-center gap-1 my-1.5 border p-0.5 rounded-sm w-fit ml-auto"
          >
            <Icon
              @click="
                ($event) =>
                  changeQuantity(
                    -1,
                    cart?.product?.id,
                    cart?.product?.min_order,
                    cart?.product?.quantity
                  )
              "
              name="ic:round-minus"
              class="w-[1.65rem] h-[1.65rem] cursor-pointer text-neutral300 hover:text-primary"
            />
            <input
              v-model="quantity"
              @change="
                changeQuantity(
                  0,
                  cart?.product?.id,
                  cart?.product?.min_order,
                  cart?.product?.quantity
                )
              "
              type="number"
              placeholder="0"
              class="w-28 outline-none focus:outline-none active:outline-none text-center border-none active:border-none h-7 focus:border-none"
            />
            <Icon
              @click="
                changeQuantity(
                  1,
                  cart?.product?.id,
                  cart?.product?.min_order,
                  cart?.product?.quantity
                )
              "
              name="ic:round-plus"
              class="w-[1.65rem] h-[1.65rem] cursor-pointer text-neutral300 hover:text-primary"
            />
          </div>
        </div>
      </div>
      <div
        class="cursor-pointer"
        @click="deleteItemFromCart(cart?.product?.id)"
      >
        <Icon
          name="ion:close"
          class="w-6 h-6 text-neutral200 hover:text-red transition-colors ease-in-out duration-200"
        />
      </div>
    </div>
    <hr class="border-lemon border-opacity-20" />
    <div class="flex items-center justify-between gap-3">
      <div>
        <h4 class="text-gray font-medium text-md">
          {{ cart?.product?.store?.supplier?.userById?.first_name }}
          {{ cart?.product?.store?.supplier?.userById?.last_name }}
        </h4>
        <p class="text-sm space-x-2 text-neutral200">
          added at
          <span class="text-xs">{{ cart?.created_at.split("T")[0] }}</span>
        </p>
      </div>
      <NuxtLink
        :to="{
          name: 'products-realtime-detail-id',
          params: { id: cart?.product?.id },
        }"
        type="button"
        class="inline-block rounded-full border-2 border-primary px-3 py-0.5 font-bold leading-normal text-primary transition duration-150 ease-in-out hover:bg-light100 focus:outline-none focus:ring-0 active:bg-primary active:text-dark100"
      >
        View Detail
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import delete_cart from "~/apollo/mutation/account/delete_cart.gql";
import update_cart from "~/apollo/mutation/account/update_cart.gql";
import { useAuth } from "~~/store/auth";

const props = defineProps({ modelValue: Object, cart: Object });
const emit = defineEmits(["deletecart", "notify", "updatequantity"]);

const quantity = ref<number>(props.cart?.quantity);
const quantityError = ref<boolean>(false);

const showDialog = ref(false);
const selectedProductId = ref<null | number>(null);
const { locale } = useI18n();

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

const autStore = useAuth();
const { mutate, onDone, onError } = useCustomMutation(delete_cart);

onDone(({ data }) => {
  emit(
    "notify",
    true,
    true,
    data?.deleteCart?.product?.title + " is deleted successfully!"
  );
  emit("deletecart");
});

onError((error) => {
  emit(
    "notify",
    true,
    false,
    "Unable to complete the operation at this time. Please try again!"
  );
});

const {
  mutate: updateCart,
  onDone: onUpdateCart,
  onError: onUpdateCartError,
} = useCustomMutation(update_cart);

onUpdateCart(({ data }) => {
  emit("updatequantity");
});

const changeQuantity = (
  state: number,
  id: number,
  minQt: number,
  maxQt: number
) => {
  if (
    typeof quantity.value == "string" ||
    quantity.value + state < minQt ||
    quantity.value + state > maxQt
  ) {
    quantityError.value = true;
    return;
  }
  quantity.value += state;
  quantityError.value = false;
  updateCart({ productId: id, userId: autStore.uid, qt: quantity.value });
};

const deleteItemFromCart = (cartId: number) => {
  selectedProductId.value = cartId;
  showDialog.value = true;
};
const handleDeleteCart = (confirmed: boolean) => {
  if (confirmed) {
    mutate({ productId: selectedProductId.value, userId: autStore.uid });
  }
  selectedProductId.value = null;
  showDialog.value = false;
};
</script>

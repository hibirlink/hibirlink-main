<template>
  <main
    class="w-full h-full relative flex flex-col items-center justify-center gap-3 max-w-[90rem] mx-auto p-4"
  >
    <h-notification
      @close="notification.show = false"
      :success="notification.status"
      v-model="notification.show"
    >
      {{ notification.content }}
    </h-notification>
    <Icon
      name="ic:round-keyboard-backspace"
      class="w-7 h-7 cursor-pointer absolute top-1 left-6 text-neutral300 hover:text-dark100 transition-colors ease-in-out duration-200"
      @click="
        ($event) => {
          router.back();
        }
      "
    />

    <section class="space-y-8">
      <h1 class="font-bold text-neutral300 text-center">
        Choose Delivery Option
      </h1>
      <div class="flex items-center justify-center gap-8 md:flex-row flex-col">
        <div
          :class="[
            deliveryOption === DeliveryOption.SELF_PICKUP
              ? 'border-primary'
              : 'border-transparent',
          ]"
          class="relative flex group flex-col items-center justify-center max-w-md gap-3 bg-light400 bg-opacity-30 p-3 border-2 rounded-lg hover:border-primary cursor-pointer transition-all ease-in-out duration-300"
          @click="($event) => (deliveryOption = DeliveryOption.SELF_PICKUP)"
        >
          <h1 class="text-primary font-semibold">Self-PickUp</h1>
          <Icon
            name="solar:check-circle-bold-duotone"
            :class="[
              deliveryOption === DeliveryOption.SELF_PICKUP
                ? 'text-primary'
                : 'text-transparent',
            ]"
            class="w-6 h-6 absolute right-3 top-3 group-hover:text-primary transition-colors ease-in-out duration-300"
          />
          <p class="text-center">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi
            deserunt, impedit repellendus numquam ab distinctio doloremque
            incidunt ex beatae autem necessitatibus.
          </p>
        </div>
        <div
          :class="[
            deliveryOption === DeliveryOption.PAIED_DELIVERY
              ? 'border-primary'
              : 'border-transparent',
          ]"
          class="relative flex group flex-col items-center justify-center max-w-md gap-3 bg-light400 bg-opacity-30 p-3 border-2 rounded-lg hover:border-2 hover:border-primary cursor-pointer transition-all ease-in-out duration-300"
          @click="($event) => (deliveryOption = DeliveryOption.PAIED_DELIVERY)"
        >
          <h1 class="text-primary font-semibold">Paied Delivery</h1>
          <Icon
            name="solar:check-circle-bold-duotone"
            :class="[
              deliveryOption === DeliveryOption.PAIED_DELIVERY
                ? 'text-primary'
                : 'text-transparent',
            ]"
            class="w-6 h-6 absolute right-3 top-3 group-hover:text-primary transition-colors ease-in-out duration-300"
          />
          <p class="text-center">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi
            deserunt, impedit repellendus numquam ab distinctio doloremque
            incidunt ex beatae autem necessitatibus.
          </p>
        </div>
      </div>
    </section>
    <section
      class="pt-8 flex flex-col items-center gap-6"
      v-if="deliveryOption == DeliveryOption.SELF_PICKUP"
    >
      <h1 class="font-bold text-neutral300">Summery</h1>
      <div
        class="flex items-center gap-x-4 flex-wrap sm:flex-row flex-col justify-center"
      >
        <h4 class="font-semibold text-neutral300 text-center">
          Item(s) Subtotal:
          <span class="text-primary">{{ payable }} ETB</span>
        </h4>
        <p>-</p>
        <h4 class="font-semibold text-neutral300 text-center">
          Delivery Option:
          <span class="text-primary">{{ deliveryOption }}</span>
        </h4>
        <p>-</p>

        <h4 class="font-semibold text-neutral300 text-center">
          Transaction Fee:
          <span class="text-primary">{{ feeRate.transaction }}%</span>
        </h4>
        <p>-</p>

        <h4 class="font-semibold text-neutral300 text-center">
          Item(s) Total Payable:
          <span class="text-primary">{{ totalPayable }} ETB</span>
        </h4>
      </div>
      <button
        @click="makePayment"
        type="button"
        class="inline-block text-center rounded-full bg-primaryvar1 px-8 space-x-4 py-2 font-bold leading-normal text-light300 shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primaryvar1 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
      >
        <Icon name="fluent:payment-20-regular" class="w-5 h-5" />
        Make Payment
      </button>
    </section>

    <section
      class="pt-8 flex flex-col items-center gap-4 w-full"
      v-if="deliveryOption == DeliveryOption.PAIED_DELIVERY"
    >
      <h1 class="font-bold text-neutral300">Summery</h1>
      <div
        class="flex items-center justify-center gap-x-4 flex-wrap md:flex-row flex-col"
      >
        <h4 class="font-semibold text-neutral300 text-center">
          Item(s) Subtotal:
          <span class="text-primary">{{ payable }} ETB</span>
        </h4>
        <p>-</p>
        <h4 class="font-semibold text-neutral300 text-center">
          Delivery Option:
          <span class="text-primary">{{ deliveryOption }}</span>
        </h4>
        <p>-</p>

        <h4 class="font-semibold text-neutral300 text-center">
          Shipping Fee:
          <span class="text-primary">{{ feeRate.shipping }} ETB Km/hr</span>
        </h4>
        <p>-</p>

        <h4 class="font-semibold text-neutral300 text-center">
          Transaction Fee:
          <span class="text-primary">{{ feeRate.transaction }}%</span>
        </h4>
        <p>-</p>

        <h4 class="font-semibold text-neutral300 text-center">
          Item(s) Total Payable:
          <span class="text-primary">{{ totalPayable }} ETB</span>
        </h4>
      </div>
      <h1 class="font-bold text-neutral300 mt-8">Shipping Addresses</h1>
      <section class="flex items-center flex-col min-w-full">
        <div
          v-if="loading"
          class="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 items-end w-full"
        >
          <div v-for="i in 5" :key="i" class="min-w-full flex flex-wrap">
            <h-skeleton-loader>
              <div class="flex gap-2 min-w-full h-full flex-col">
                <div class="w-3/4 h-6 rounded bg-neutral500"></div>
                <div class="w-2/4 h-6 rounded bg-neutral500"></div>
              </div>
            </h-skeleton-loader>
          </div>
        </div>

        <div
          v-else
          class="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 items-end w-full"
        >
          <div
            v-for="address in shippingAddresses"
            :key="address?.id"
            @click="
              ($event) => {
                selectedAddress.id = address?.id;
                selectedAddress.address = address;
              }
            "
            :class="[
              selectedAddress?.id == address?.id
                ? 'border-primary'
                : 'border-neutral600',
            ]"
            class="flex items-center gap-2 bg-light400 border bg-opacity-40 px-4 py-2 rounded-md cursor-pointer hover:border-primary transition-colors ease-in-out duration-200"
          >
            <h-radio-button
              :id="address?.id?.toString()"
              name="shipping_address"
              :value="address?.id"
              v-model="selectedAddress.id"
            />
            <div class="text-neutral200">
              <p>
                {{ address?.email }}, {{ address?.phone_number1 }},
                {{ address?.phone_number1 }}
              </p>
              <p>Bole, Addis Ababa, {{ address?.zip_code }}, Ethopia</p>
            </div>
          </div>
        </div>

        <div
          class="flex lg:flex-row flex-col items-center gap-6 mt-8 bg-light400 min-w-full bg-opacity-50 rounded-lg p-4"
        >
          <form
            class="flex-1 lg:max-w-xs w-full gap-x-6 grid lg:grid-cols-1 md:grid-cols-2 grid-cols-1"
          >
            <h1 class="font-bold text-neutral300 self-start">
              Add New Address
            </h1>
            <h-text-field
              name="email"
              label="email"
              placeholder="abebekebede@email.com"
              rules="email"
              type="text"
            />
            <h-text-field
              name="phone_number1"
              label="phone one"
              placeholder="0900000000"
              rules="phone"
              leading-text="+251"
              type="text"
            />
            <h-text-field
              name="phone_number2"
              label="phone two"
              placeholder="0900000000"
              rules="phone|uniquephone:phone1"
              leading-text="+251"
              type="text"
            />
            <h-text-area
              name="description"
              label="description"
              placeholder="My resdence is in Ethopia, Bahir Dar City, Near Poly Campus"
              rules="required"
            />
            <h-select
              class="w-full"
              name="city"
              label="city/region"
              v-model:selectedValue="selectedRegion"
              :items="regions"
            />
            <h-select
              class="w-full"
              name="sub_city"
              label="sub city"
              v-model:selectedValue="selectedSubCity"
              :items="subCities"
            />
            <h-text-field
              name="state_provinence"
              label="State Provinence"
              placeholder="Bole, Addis Ababa, Ethopia"
              rules="required"
              type="text"
            />

            <h-text-field
              name="zip_code"
              label="zep code"
              placeholder="6000"
              rules="required"
              type="text"
            />
          </form>
          <div class="flex-auto lg:w-64 w-full space-y-4">
            <div class="w-full h-[42rem] z-0">
              <h-interactive-geo-location
                class="min-w-full min-h-full"
                :to-track-with-real-address-line="true"
                :is-to-add-location="true"
                @get-location="getLocation"
                :max-zoom="20"
                :center="{
                  lat:
                    selectedSubCity?.latitude ??
                    selectedRegion?.latitude ??
                    9.005401,
                  lng:
                    selectedSubCity?.longitude ??
                    selectedRegion?.longitude ??
                    38.763611,
                }"
              />
            </div>
            <button
              type="button"
              @click="onSubmit"
              class="inline-block w-fit h-fit rounded-full border-2 border-primary px-6 py-1 font-bold leading-normal text-primary transition duration-150 ease-in-out hover:bg-light100 focus:outline-none focus:ring-0 active:bg-primary active:text-dark100"
            >
              Add Address
            </button>
          </div>
        </div>
      </section>
      <button
        @click="makePayment"
        type="button"
        class="inline-block text-center rounded-full bg-primaryvar1 px-8 space-x-4 py-2 font-bold leading-normal text-light300 shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primaryvar1 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
      >
        <Icon name="fluent:payment-20-regular" class="w-5 h-5" />
        Make Payment
      </button>
    </section>
  </main>
</template>

<script setup lang="ts">
import cart_payable from "~/apollo/query/account/payable.gql";
import shipping_address from "~/apollo/query/account/shipping_address.gql";
import add_shipping_address from "~/apollo/mutation/account/add_shipping_address.gql";
import make_payment from "~/apollo/mutation/account/make_payment.gql";
import { storeToRefs } from "pinia";
import { useForm } from "vee-validate";
import { useAuth } from "~~/store/auth";
import { useStore } from "~~/store/data";

enum DeliveryOption {
  SELF_PICKUP = "Self-PickUp",
  PAIED_DELIVERY = "Paied Delivery",
}
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
const router = useRouter();
const authStore = useAuth();
const { locale } = useI18n();
const dataStore = useStore();
const { sub_city, region_city } = storeToRefs(dataStore);

const selectedRegion = ref<any>(null);
const regions = computed(() =>
  region_city.value?.map((region: any) => {
    return {
      id: region.id,
      name: mapLang(region.name, locale.value),
      longitude: region.longitude,
      latitiude: region.latitiude,
    };
  })
);
const selectedSubCity = ref<any>(null);
const subCities = computed(() =>
  sub_city.value
    ?.filter((subCity: any) => subCity?.region_id == selectedRegion.value?.id)
    ?.map((subCity: any) => {
      return {
        id: subCity.id,
        name: mapLang(subCity.name, locale.value),
        longitude: subCity.longitude,
        latitiude: subCity.latitiude,
      };
    })
);

const { result: pricePayable } = useCustomQuery(cart_payable, {
  userId: authStore.uid,
});
const payable = computed(() => pricePayable.value?.user?.total_price ?? 0);
const feeRate = reactive({ transaction: 3, shipping: 100 });
const totalPayable = computed(() => {
  if (deliveryOption.value == DeliveryOption.PAIED_DELIVERY)
    return (
      payable.value +
      payable.value * (feeRate.transaction / 100) +
      feeRate.shipping
    );
  return payable.value + payable.value * (feeRate.transaction / 100);
});

const { refetch, result, loading, error } = useCustomQuery(shipping_address, {
  customerId: authStore.uid,
});
const deliveryOption = ref<DeliveryOption | null>(null);
const shippingAddresses = computed(() => result.value?.address);
type AddressType = {
  id: number | undefined | string;
  address: any;
};
const selectedAddress = reactive<AddressType>({
  id: undefined,
  address: undefined,
});

const { meta, handleSubmit, resetForm } = useForm();
const selectedLoc = reactive<{
  longitude: number | undefined;
  latitude: number | undefined;
}>({
  longitude: undefined,
  latitude: undefined,
});
const getLocation = (loc: any) => {
  console.log(loc);
  selectedLoc.longitude = loc.lng;
  selectedLoc.latitude = loc.lat;
};

const onSubmit = handleSubmit((values) => {
  if (!selectedLoc.latitude && !selectedLoc.longitude) {
    notification.show = true;
    notification.status = false;
    notification.content =
      "Please pick or locate your approprate location from the map!";
    return;
  }
  addShippingAddress({
    address: {
      customer_id: authStore.uid,
      sub_city_id: selectedSubCity.value?.id,
      email: values.email,
      phone_number1: values.phone_number1,
      phone_number2: values.phone_number2,
      description: values.description,
      state_provinence: values.state_provinence,
      zip_code: values.zip_code,
      ...selectedLoc,
    },
  });
});

const {
  mutate: addShippingAddress,
  onDone: onAddressAdded,
  onError: onAddresError,
} = useCustomMutation(add_shipping_address);
onAddressAdded(({ data }) => {
  refetch();
  selectedAddress.id = data.address.id;
  selectedAddress.address = data.address;
  selectedLoc.longitude = undefined;
  selectedLoc.latitude = undefined;
  selectedRegion.value = null;
  selectedSubCity.value = null;
  resetForm();
  notification.show = true;
  notification.status = true;
  notification.content = "Address successfully added!";
});
onAddresError((error) => {
  notification.show = true;
  notification.status = false;
  notification.content =
    "Unable to complete the operation at this time. Please try again!";
});

const { mutate, onDone, onError } = useCustomMutation(make_payment);
onDone(({ data }) => {
  console.log(data);
  selectedAddress.id = undefined;
  selectedAddress.address = undefined;
  deliveryOption.value = null;
  notification.show = true;
  notification.status = data.makePayment.success;
  notification.content = "Checkout Successful! Please complete your Payment!";
  window.location.href = data.makePayment.paymentUrl;
});

onError((error) => {
  notification.show = true;
  notification.status = false;
  notification.content =
    "Unable to complete the operation at this time. Please try again!";
});

const makePayment = () => {
  if (
    deliveryOption.value == DeliveryOption.PAIED_DELIVERY &&
    (!selectedAddress.id || !selectedAddress.address)
  ) {
    notification.show = true;
    notification.status = false;
    notification.content = "Please selected shipping address!";
    return;
  }
  mutate({
    paymentArg: {
      userId: authStore.uid,
      deliveryOption: deliveryOption.value === DeliveryOption.PAIED_DELIVERY,
      addressId: selectedAddress.id ?? null,
    },
  });
};

useHead({
  title: "Checkout & Pay",
});

definePageMeta({
  layout: "custom",
  middleware: "before-entry",
});
</script>

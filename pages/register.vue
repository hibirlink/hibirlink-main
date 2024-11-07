<template>
  <ClientOnly>
    <div v-if="loadingLocations">Loading</div>
    <main v-else class="min-h-[calc(100vh-3.7rem)] flex flex-col mx-auto px-5">
      <h-notification
        @close="messageShow = false"
        :success="messageStatus"
        v-model="messageShow"
        >{{ messageContent }}
      </h-notification>
      <div
        class="w-full mx-auto flex flex-col gap-3 justify-center mt-2 text-primary"
      >
        <h1 class="text-3xl font-bold">Register As A Supplier</h1>
        <p class="text-gray text-sm text-neutral300">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima ab
          voluptatibus dolorum voluptates? Quisquam itaque aut asperiores, ipsum
          error cupiditate blanditiis numquam pariatur sapiente explicabo libero
          laborum nam minima accusantium enim nesciunt quidem expedita eaque
          ratione. Lorem ipsum dolor sit amet, consectetur adipisicing elit. A
          id ipsum mollitia culpa, recusandae eligendi aperiam? Error nam, nulla
          odit dignissimos et porro iure nihil, molestias corporis laudantium
          incidunt ab! Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Accusantium dolorem consequuntur blanditiis, necessitatibus maxime
          mollitia consequatur magnam iste veniam nemo aspernatur modi unde, ut
          inventore assumenda molestias non minus quisquam!
        </p>
      </div>
      <div class="flex flex-col justify-center mt-8">
        <div class="w-full mx-auto lg:grid lg:grid-cols-2 lg:gap-x-5">
          <h1 class="text-2xl font-bold w-full mx-auto mb-3 text-neutral200">
            Submit The Form Below
          </h1>
          <h1 class="text-xl xl:text-2xl font-bold w-full mx-auto mb-3"></h1>
        </div>

        <form @submit.prevent="handleRegisterSupplier" class="w-full">
          <div class="mx-auto sm:grid sm:grid-cols-2 sm:gap-x-5">
            <h1 class="text-lg font-bold w-full mx-auto mb-3 text-neutral300">
              Basic Info
            </h1>
            <h1 class="text-xl xl:text-2xl font-bold w-full mx-auto mb-3"></h1>

            <h-text-field
              class="w-full mx-auto"
              name="FullName"
              :placeholder="userFullName"
              type="text"
              :disabled="true"
              label="full_name"
            />

            <h-text-field
              class="w-full mx-auto"
              name="Email"
              :placeholder="userEmail"
              type="text"
              label="email"
              :disabled="true"
            />

            <h-text-field
              class="w-full mx-auto"
              name="TinNumber"
              placeholder="784ERW"
              type="text"
              rules="required"
              label="tin_number"
            />

            <h-text-field
              class="w-full mx-auto"
              name="PhoneNumber"
              placeholder="933-704-978"
              type="tel"
              rules="required"
              label="phone"
              leading-text="+251"
            />
          </div>
          <h1
            class="text-lg font-bold w-full mx-auto mb-3 text-neutral300 mt-5"
          >
            Location Info
          </h1>
          <h1 class="text-xl xl:text-2xl font-bold w-full mx-auto mb-3"></h1>
          <RegistrationSelectCities :city-items="cityList || []" />

          <h1
            class="text-lg font-bold w-full mx-auto mb-3 mt-5 text-neutral300"
          >
            Additional Information (Optional)
          </h1>

          <div
            class="flex w-full items-center my-5 transition-all duration-300 ease-in-out"
          >
            <p
              v-if="accountList.length > 0"
              class="flex-1 font-bold cursor-pointer transition-all duration-300 ease-in-out text-primaryvar4"
            >
              Social Accounts
            </p>
            <p
              @click="showPopUp = !showPopUp"
              class="w-fit font-semibold text-neutral300/60 hover:text-neutral300/80 cursor-pointer transition-all duration-300 ease-in-out border-2 border-primaryvar1 hover:border-primary/20 rounded-lg border-opacity-20 py-1 px-2"
            >
              Add Social Account
            </p>
          </div>

          <div class="flex flex-wrap gap-4 w-full my-5">
            <div
              v-for="account in accountList"
              :key="account.key"
              class="flex flex-wrap items-center text-sm gap-2 w-fit border border-primaryvar1 rounded-full border-opacity-50 py-2 px-4"
            >
              <p class="font-bold text-primaryvar2">{{ account.key }}:</p>

              <span class="text-neutral-500 font-semibold"
                >{{ account.value }}
              </span>

              <Icon
                @click="() => removeAccount(account)"
                name="material-symbols:cancel-outline-rounded"
                class="rounded-tr-md rounded-bl-md w-5 h-5 -mr-1 text-red cursor-pointer shrink-0 transition-colors ease-in-out duration-300"
              />
            </div>
          </div>

          <h-dialog
            @close="showPopUp = !showPopUp"
            @form-submit="addSocialMedialAccount"
            :show-dialog="showPopUp"
            v-model:model-value="showPopUp"
            title="Add Social Media"
            content="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sit vero
        molestiae pariatur."
          >
            <template #content>
              <h-select
                class="mt-2"
                :items="['Facebook', 'Instagram', 'Telegram']"
                name="SocialMediaType"
                label="Social Media Type"
                rules="required"
              />

              <div class="-mt-2">
                <h-text-field
                  name="SocialMediaLink"
                  placeholder="Social Account Link"
                  rules="required"
                  type="text"
                  label="Account Link"
                />
              </div>

              <HButton
                type="submit"
                name="Add Social Account"
                button_class="px-7"
                class="mt-5 w-full"
                rounded-class="rounded-md"
                :gradient="false"
                btn-name-class="font-bold"
                btn-name="Add Social Account"
              ></HButton>
            </template>
          </h-dialog>

          <HButton
            type="submit"
            btn-name="Register As Supplier"
            name="Add Social Account"
            button_class="px-7"
            class="mt-5 ml-auto w-full max-w-[13rem]"
            rounded-class="rounded-sm"
            :gradient="false"
            btn-name-class="font-bold"
            :is-loading="loading"
          ></HButton>
        </form>
      </div>
    </main>
  </ClientOnly>
</template>
<script setup lang="ts">
import jwtDecode from "jwt-decode";
import { useField, useForm } from "vee-validate";
import locations from "@/apollo/query/locations.gql";
import registerSupplier from "@/apollo/mutation/registerAsSupplier.gql";
import { useAuth } from "~~/store/auth";

const {
  mutate: registerAsSupplier,
  onDone: onRegisterSupplierDone,
  onError: onRegisterSupplierError,
} = useCustomMutation(registerSupplier);

const {
  onResult,
  onError,
  loading: loadingLocations,
} = useCustomQuery(locations);

onError((error) => {
  console.log(error);
});

interface LocationInterface {
  id: number;
  original_language: {
    translation_contents: {
      language_type: string;
      name: string;
    }[];
  };

  sub_cities: {
    id: number;
    original_language: {
      translation_contents: {
        language_type: string;
        name: string;
      }[];
    };
  }[];
}

const location = ref<Array<LocationInterface>>([]);
onResult((data) => {
  location.value = data.data.cities as Array<LocationInterface>;
});

const { locale } = useI18n();
const cityList = computed(() => {
  return location.value.map((locations) => {
    return {
      id: locations.id,
      name: locations.original_language.translation_contents.find((lng) => {
        return lng.language_type === locale.value;
      })?.name,
      subCities: locations.sub_cities.map((subCities) => {
        return {
          id: subCities.id,
          name: subCities.original_language.translation_contents.find((lng) => {
            return lng.language_type === locale.value;
          })?.name,
        };
      }),
    };
  });
});

const loading = ref<boolean>(false);
const showPopUp = ref(false);
const messageStatus = ref(false);
const messageShow = ref(false);
const messageContent = ref("");
const { handleSubmit, resetForm } = useForm();

onRegisterSupplierDone(async (data) => {
  const { registerAsSupplier: result } = data.data as {
    registerAsSupplier: { accessToken: string };
  };
  await decodeAndStoreJwtToken(result.accessToken);
  loading.value = false;
  resetForm();
  window.location.href = "http://localhost:3001";
});

onRegisterSupplierError((error) => {
  console.log(error);

  showNotification(false, error + "");
  loading.value = false;
});

interface AccountInterface {
  key?: string;
  value?: string;
}
const accountList = ref<Array<AccountInterface>>([]);
const { token, name, email } = useAuth();
const userFullName = ref<string>(name);

const userEmail = ref<string>(email);

const addSocialMedialAccount = (account: {
  SocialMediaType: string;
  SocialMediaLink: string;
}) => {
  const { SocialMediaType: key, SocialMediaLink: value } = account;

  let ignorePush = false;
  accountList.value.forEach((acc) => {
    if (acc.key === key) {
      acc.value = value;
      ignorePush = true;
      return;
    }
  });
  if (!ignorePush)
    accountList.value?.push({
      key,
      value,
    });

  // hide the popup
  showPopUp.value = false;
};

const removeAccount = (account: AccountInterface) => {
  accountList.value = accountList.value.filter((acc) => acc !== account);
};

const handleRegisterSupplier = handleSubmit(
  (value) => {
    const { uid } = useAuth();
    loading.value = true;
    const {
      PhoneNumber: phone_number,
      TinNumber: tin_number,
      SubCity: sub_city,
    } = value;

    const object = {
      uid: uid,
      object: {
        socialAccount: JSON.stringify(accountList.value),
        accessToken: token,
        subCityId: sub_city.id,
        tinNumber: tin_number,
      },
    };

    registerAsSupplier(object);
  },
  (error) => {}
);

const showNotification = (status: boolean, message: string) => {
  messageShow.value = true;
  messageStatus.value = status;
  messageContent.value = message;
};

const decodeAndStoreJwtToken = async (token: string) => {
  const { name, email, metadata } = (await jwtDecode(token)) as {
    name: string;
    email: string;
    metadata: { roles: Array<string>; user_id: string };
  };

  const { roles, user_id } = metadata;

  const { setToken, setUID, setName, setRole, setEmail } = useAuth();
  setToken(token);
  setUID(user_id);
  setName(name);
  setRole(roles[0]);
  setEmail(email);
};

definePageMeta({
  middleware: ["before-register-entry"],
  layout: "custom",
});
</script>

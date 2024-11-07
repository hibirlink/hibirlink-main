<script setup lang="ts">
import Logo from "@/assets/icons/logo.svg";
import verifyTokenMutation from "~/apollo/mutation/verifyToken.gql";
import update_user_id from "~/apollo/mutation/update_user_id.gql";

import { useForm } from "vee-validate";
const { handleSubmit } = useForm();
const { signUpUser } = useFirebaseClient();

const {
  mutate: verifyTokenAction,
  onDone: onVerifyTokenSuccess,
  onError: onVerifyTokenError,
} = useCustomMutation(verifyTokenMutation);

const {
  mutate: updateID,
  onDone: onUpdateID,
  onError: onUpdateIDError,
} = useCustomMutation(update_user_id);

const route = useRoute();
const id = ref("");
const firstName = ref("");
const lastName = ref("");
const email = ref("");
const verify_error = ref(false);
const verify_loading = ref(true);
const verify_success = ref(false);
const notification_message = ref("");
const loading_for_setup_password = ref(false);
const show_notification = ref(false);
const is_success = ref(false);
onMounted(() => {
  verify_token();
});

const verify_token = async () => {
  const { token } = route.query;
  console.log(token);
  if (token) {
    verify_loading.value = true;
    verifyTokenAction({
      token,
    });
  } else {
    verify_error.value = true;
    verify_loading.value = false;
  }
};

onVerifyTokenSuccess((result: any) => {
  console.log(result);
  let user = result.data.verifyToken;
  firstName.value = user.first_name;
  lastName.value = user.last_name;
  id.value = user.id;
  email.value = user.email;
  verify_loading.value = false;
  verify_success.value = true;
});

onVerifyTokenError((error) => {
  console.log(error);
  verify_error.value = true;
  verify_loading.value = false;
});

const handlePasswordSetup = handleSubmit(async (value) => {
  loading_for_setup_password.value = true;
  const {
    success,
    message,
    id: firebase_id,
  } = await signUpUser(
    firstName.value,
    lastName.value,
    email.value,
    value.password
  );

  if (success) {
    updateID({ id: id.value, firebase_id });
  } else {
    loading_for_setup_password.value = false;
    is_success.value = false;
    notification_message.value = message;
  }
  show_notification.value = true;

  console.log(value);
});

onUpdateID((result) => {
  is_success.value = true;
  notification_message.value =
    "Email Verification is Sent. Please Verify Your Email ";
  loading_for_setup_password.value = false;
});
onUpdateIDError((error) => {
  is_success.value = false;
  console.log(error);
  loading_for_setup_password.value = false;
  notification_message.value = "Error Occurred";
});
</script>

<template>
  <div class="w-full">
    <h-notification
      :message="notification_message"
      v-model="show_notification"
      :success="is_success"
    ></h-notification>
    <div
      v-if="verify_loading"
      class="flex justify-center gap-3 h-screen items-center"
    >
      <Icon name="uil:process" class="text-2xl animate-spin" />
      <span class="text-xl font-semibold">Verifying</span>
    </div>
    <div
      v-else-if="verify_success"
      class="flex flex-col justify-center h-full gap-5 w-full items-center pt-8"
    >
      <div class="flex flex-col gap-2 items-center">
        <Logo class="scale-[0.71] -ml-3" />

        <h1 class="text-3xl font-black text-darkblue">Setup Your Password</h1>
        <span class="text-lg font-semibold text-darkblue"
          >{{ firstName }} {{ lastName }}</span
        >
        <span class="font-semibold text-darkblue">{{ email }}</span>
      </div>
      <form
        @submit.prevent="handlePasswordSetup"
        class="flex flex-col gap-2 pb-12 md:w-[30rem] md:max-w-none max-w-xs drop-shadow-sm shadow-sm rounded-md bg-light400 px-8 py-4"
      >
        <h-text-field
          name="password"
          type="password"
          label="Password"
          class="border-primaryvar5"
          rules="required|password"
          id="password"
        />
        <h-text-field
          name="confirm"
          type="password"
          label="Confirm"
          rules="required|confirmPassword:password"
          class="border-primaryvar5"
          label-class="font-semibold"
          id="confirm"
        />
        <h-button
          type="submit"
          btn-name="Submit"
          btn-class="h-[2.3rem] font-bold rounded-md text-light400"
          :rounded="false"
          :is-loading="loading_for_setup_password"
          loading-text="submitting..."
          loading-text-class="text-light400"
        />
      </form>
    </div>
    <div
      class="flex gap-2 justify-center items-center w-full h-screen"
      v-else-if="verify_error"
    >
      <Icon name="uil:exclamation-circle" class="text-xl text-red" />
      <span class="text-lg text-red"> Error Happened </span>
    </div>
  </div>
</template>

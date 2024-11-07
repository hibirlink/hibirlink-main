<template>
  <div class="flex flex-col justify-center items-center min-h-screen">
    <h-notification
      @close="messageShow = false"
      :success="messageStatus"
      v-model="messageShow"
      >{{ messageContent }}
    </h-notification>
    <header>
      <img
        class="w-20 mx-auto mb-5"
        src="https://img.icons8.com/fluent/344/year-of-tiger.png"
      />
    </header>
    <form class="w-full max-w-[27rem] p-5" @submit.prevent="handleRegister">
      <h1 class="text-3xl font-bold mb-3 text-neutral100">Register</h1>
      <h1 class="text-sm text-neutral200 mb-3">
        Sign up and join our linked best market.
      </h1>
      <div>
        <HTextField
          name="FirstName"
          placeholder="First Name"
          rules="required"
        />

        <HTextField name="LastName" placeholder="Last Name" rules="required" />

        <HTextField
          name="Email"
          placeholder="Email Address"
          rules="required|email"
        />

        <HTextField
          name="Password"
          type="password"
          placeholder="Password"
          rules="required|password"
          trailing-icon="mdi:eye-outline"
        />

        <HTextField
          name="ConfirmPassword"
          type="password"
          placeholder="Confirm Password"
          rules="required|confirmPassword:Password"
          trailing-icon="mdi:eye-outline"
        />
      </div>

      <br />
      <HButton
        btn-name-class="font-bold"
        type="submit"
        :is-loading="loading"
        btn-name="Sign Up"
        rounded-class="rounded-md"
      />

      <p class="text-sm w-full text-center mt-3">
        Already have an account?
        <NuxtLink
          to="/auth/signIn"
          class="font-bold text-primary hover:text-primaryvar1"
          >Sign In</NuxtLink
        >
      </p>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useForm } from "vee-validate";

const loading = ref<boolean>(false);
const messageStatus = ref(false);
const messageShow = ref(false);
const messageContent = ref("");

const { handleSubmit, resetForm } = useForm();

const handleRegister = handleSubmit(async (value) => {
  loading.value = true;
  const {
    FirstName: firstName,
    LastName: lastName,
    Email: email,
    Password: password,
  } = value;

  const { signUpUser } = useFirebaseClient();
  const { success, message } = await signUpUser(
    firstName,
    lastName,
    email,
    password
  );

  if (success) {
    resetForm();
    showNotification(true, message);
  } else showNotification(false, useErrorParser(message));

  loading.value = false;
});

const showNotification = (status: boolean, message: string) => {
  messageShow.value = true;
  messageStatus.value = status;
  messageContent.value = message;
};

definePageMeta({
  middleware: "before-sign-in",
});
</script>

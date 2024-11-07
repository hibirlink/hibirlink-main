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
    <form
      class="w-full max-w-[27rem] p-5"
      @submit.prevent="handleForgetPassword"
    >
      <h1 class="text-3xl font-bold mb-3 text-neutral100">Forgot Password</h1>
      <h1 class="text-sm text-neutral200 mb-5">
        Enter the email associated with your account and we will send an email
        with instructions to reset your password.
      </h1>
      <div>
        <HTextField
          name="Email"
          placeholder="Email Address"
          rules="required|email"
        >
        </HTextField>
      </div>

      <br />

      <div class="flex gap-4">
        <NuxtLink to="/auth/signIn" class="flex-1">
          <HButton
            type="button"
            btn-name="Back to Login"
            btn-name-class="font-bold"
            rounded-class="rounded-md"
          />
        </NuxtLink>
        <HButton
          class="flex-1"
          type="submit"
          :is-loading="loading"
          btn-name="Send Instructions"
          rounded-class="rounded-md"
          btn-name-class="font-bold"
        />
      </div>
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

const handleForgetPassword = handleSubmit(async (value) => {
  loading.value = true;
  const { Email: email } = value;
  const { sendUserPasswordResetEmail } = useFirebaseClient();
  const { success, message } = await sendUserPasswordResetEmail(email);
  loading.value = false;

  if (success) {
    resetForm();
    showNotification(true, message);
  } else showNotification(false, useErrorParser(message));
});

const showNotification = (status: boolean, message: string) => {
  messageShow.value = true;
  messageStatus.value = status;
  messageContent.value = message;
};

definePageMeta({
  middleware: "before-forget-entry",
});
</script>

<template>
  <!--  -->
  <div class="flex flex-col justify-center items-center min-h-screen">
    <div class="w-full max-w-[27rem] p-5">
      <div
        v-if="_route.query.mode === 'verifyEmail' && loading"
        class="flex justify-center items-center gap-2 w-full flex-col"
      >
        <div
          class="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status"
        ></div>
        <span class="text-xl">Verifying...</span>
      </div>

      <div
        v-if="_route.query.mode === 'verifyEmail' && !loading"
        class="w-full flex flex-col items-center justify-center"
      >
        <h1 class="text-xl font-bold mb-3 w-full text-neutral100">
          {{
            emailVerificationResult?.success
              ? "Verification Success."
              : "Try verifying your email again."
          }}
        </h1>

        <h1 class="text-sm text-neutral200 mb-3">
          {{ emailVerificationResult?.message }}
        </h1>

        <NuxtLink to="/auth/signIn" class="w-full mt-3">
          <HButton
            btn-class="w-full"
            type="button"
            btn-name="Back To Login"
            btn-name-class="font-bold"
            rounded-class="rounded-md"
          />
        </NuxtLink>
      </div>

      <form
        v-if="$route.query.mode === 'resetPassword'"
        @submit.prevent="handleResetPassword"
      >
        <h1 class="text-3xl font-bold mb-3 text-neutral100">
          Reset Your Password
        </h1>
        <h1 class="text-sm text-neutral200 mb-4">
          Please set your new password
        </h1>

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
        <br />
        <div class="flex gap-4">
          <NuxtLink to="/auth/signIn" class="flex-1">
            <HButton
              btn-class="w-full"
              type="button"
              btn-name="Back to Login"
              btn-name-class="font-bold"
              rounded-class="rounded-md"
            />
          </NuxtLink>
          <HButton
            class="flex-1"
            btn-name="Reset Password"
            btn-name-class="font-bold"
            type="submit"
            :is-loading="loadingForReset"
            rounded-class="rounded-md"
          />
        </div>
      </form>
    </div>
  </div>

  <!--  -->
</template>

<script lang="ts" setup>
import { useForm } from "vee-validate";

const _route = useRoute();

const emailVerificationResult = ref<{ success: boolean; message: string }>();

const loading = ref(true);
const loadingForReset = ref<boolean>(false);
onMounted(async () => {
  if (_route.query.mode === "verifyEmail") {
    const { applyUserActionCode } = useFirebaseClient();
    emailVerificationResult.value = await applyUserActionCode(
      _route.query.oobCode as string
    );
    loading.value = false;
  }
});

const { handleSubmit, resetForm } = useForm();

const handleResetPassword = handleSubmit(async (value) => {
  loadingForReset.value = true;
  const { Password: password } = value;

  const { confirmUserPasswordReset } = useFirebaseClient();

  const { message, success } = await confirmUserPasswordReset(
    _route.query.oobCode as string,
    password
  );

  loadingForReset.value = false;
});

definePageMeta({
  validate(route) {
    return (
      (route.query.mode === "verifyEmail" ||
        route.query.mode === "resetPassword") &&
      route.query.apiKey === useRuntimeConfig().public.firebaseApiKey &&
      (route.query.oobCode as string).length > 10
    );
  },
});
</script>

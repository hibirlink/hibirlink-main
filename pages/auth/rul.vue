<template>
  <div class="flex flex-col justify-center items-center min-h-screen">
    <div class="w-full max-w-[27rem] p-5">
      <h1 class="text-2xl font-bold mb-3 text-neutral100">
        Your Session has Expired.
      </h1>
      <h1 class="text-sm text-neutral200 mb-4">Please sign in again.</h1>

      <NuxtLink to="/auth/signIn" class="w-full mt-4">
        <HButton
          type="button"
          btn-name="Sign In"
          btn-name-class="font-bold"
          rounded-class="rounded-md"
        />
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: "before-rul-entry",
});
</script>

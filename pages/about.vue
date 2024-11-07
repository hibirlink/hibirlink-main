<template>
  <p>About Page</p>
  <NuxtLink to="/">Index</NuxtLink>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: "before-entry",
  layout: "custom",
});
</script>

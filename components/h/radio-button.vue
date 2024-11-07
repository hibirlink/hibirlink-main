<template>
  <div class="flex items-center gap-2 w-min">
    <input
      type="radio"
      :id="props.id"
      v-model="radioModal"
      class="appearance-none checked:ring-1 ring-offset-2 border-neutral300 border-1 active:bg-primary cursor-pointer focus:ring-primary focus:text-primay checked:text-primary"
      :value="props.id"
      :name="props.name"
    />
    <label
      :for="props.id"
      class="text-sm whitespace-nowrap cursor-pointer font-semibold"
      >{{ props.label }}</label
    >
  </div>
</template>
<script lang="ts" setup>
const props = defineProps({
  id: String,
  label: String,
  name: {
    type: String,
    required: true,
  },
  value: [String, Number],
  modelValue: [String, Number],
});
const emit = defineEmits(["update:modelValue"]);

const radioModal = computed({
  get: () => {
    return props.modelValue;
  },
  set: (value) => {
    emit("update:modelValue", value);
  },
});
</script>

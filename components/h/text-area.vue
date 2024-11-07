<script setup lang="ts">
import { useField } from "vee-validate";

interface Props {
  modelValue?: string | number;
  name: string;
  id?: string;
  placeholder?: string;
  label?: string;
  labelClass?: string;
  hideDetail?: boolean;
  rules?: string;
  disabled?: boolean;
  class?: string;
  placeholderStyle?: string;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: "",
  hideDetail: false,
  rules: "",
  disabled: false,
});

const emit = defineEmits(["update:modelValue"]);

const {
  errorMessage,
  value: inputValue,
  meta,
} = useField(props.name, props.rules, {
  initialValue: props.modelValue,
});

const set = (event: any) => {
  emit("update:modelValue", event?.target?.value);
};

watch(
  () => props.modelValue,
  (newVal) => {
    inputValue.value = newVal;
  }
);
</script>

<template>
  <div :class="props.class" class="w-full group">
    <label
      :class="props.class"
      class="text-neutral400 font-semibold group-hover:font-bold mb-1 text-sm"
      :for="name"
    >
      {{ label }}
    </label>
    <div
      class="relative group flex items-center justify-center transition-all ease-in-out duration-300"
      :class="props.class"
    >
      <textarea
        v-model="inputValue"
        @input="set($event)"
        @change="set($event)"
        :name="props.name"
        step="any"
        :id="props.name"
        :class="[
          props.class ? props.class : '',
          props.placeholderStyle
            ? props.placeholderStyle
            : ' placeholder-neutral400 font-medium',
        ]"
        class="resize-none min-h-[10rem] appearance-none text-sm bg-light400 bg-opacity-30 font-semibold text-neutral300 border border-neutral500 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline focus:border-primary hover:border-primary transition-colors duration-300 ease-in-out"
        :placeholder="props.placeholder"
        aria-invalid="true"
        aria-describedby="email-error"
        :disabled="props.disabled"
      />
    </div>

    <p
      v-if="!props.hideDetail"
      :visible="errorMessage"
      class="px-1 text-xs font-medium text-red mb-1"
      id="email-error"
    >
      {{ errorMessage || "" }} &nbsp;
    </p>
  </div>
</template>

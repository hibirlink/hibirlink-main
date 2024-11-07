<template>
  <div class="mx-auto sm:grid sm:grid-cols-2 sm:gap-x-5">
    <h-select
      :items="cityItems"
      name="Region"
      label="region_city_administration"
      rules="required"
      v-model:model-value="regionAt"
    ></h-select>
    <h-select
      :items="subCitiesAt ?? []"
      name="SubCity"
      label="sub_city"
      rules="required"
    ></h-select>
  </div>
</template>

<script setup lang="ts">
import { useField } from "vee-validate";

interface propsInterface {
  cityItems?: {
    id: number;
    name: string | undefined;
    subCities: {
      id: number;
      name: string | undefined;
    }[];
  }[];
}

const props = defineProps<propsInterface>();

console.log(props.cityItems);

const regionAt = ref<{ id: number; name: string }>();
const subCitiesAt = ref<Array<{ id: number; name: string | undefined }>>();
const { value } = useField("SubCity", "required");

watch(regionAt, (newValue: { id: number; name: string }) => {
  value.value = "";
  subCitiesAt.value =
    props.cityItems &&
    props.cityItems.find((predicate) => {
      return predicate.id === newValue.id;
    })?.subCities;
});
</script>

<template>
  <ul class="flex flex-row gap-1 items-center">
    <li @click="readonly == true ? null : ChangeRating(1)">
      <Icon
        name="bxs:star"
        class="w-4 h-4 stroke-2 stroke-primary"
        :class="[
          rating >= 1 ? 'text-primary' : 'text-light400',
          props.readonly ? '' : 'cursor-pointer',
        ]"
      />
    </li>
    <li @click="readonly == true ? null : ChangeRating(2)">
      <Icon
        name="bxs:star"
        class="w-4 h-4 stroke-2 stroke-primary"
        :class="[
          rating >= 2 ? 'text-primary' : 'text-light400',
          props.readonly ? '' : 'cursor-pointer',
        ]"
      />
    </li>
    <li @click="readonly == true ? null : ChangeRating(3)">
      <Icon
        name="bxs:star"
        class="w-4 h-4 stroke-2 stroke-primary"
        :class="[
          rating >= 3 ? 'text-primary' : 'text-light400',
          props.readonly ? '' : 'cursor-pointer',
        ]"
      />
    </li>
    <li @click="readonly == true ? null : ChangeRating(4)">
      <Icon
        name="bxs:star"
        class="w-4 h-4 stroke-2 stroke-primary"
        :class="[
          rating >= 4 ? 'text-primary' : 'text-light400',
          props.readonly ? '' : 'cursor-pointer',
        ]"
      />
    </li>
    <li @click="readonly == true ? null : ChangeRating(5)">
      <Icon
        name="bxs:star"
        class="w-4 h-4 stroke-2 stroke-primary"
        :class="[
          rating == 5 ? 'text-primary' : 'text-light400',
          props.readonly ? '' : 'cursor-pointer',
        ]"
      />
    </li>
  </ul>
</template>

<script lang="ts" setup>
interface RateInterfaceProps {
  rateValue: number;
  readonly: boolean;
}
const props = defineProps<RateInterfaceProps>();
const rating = ref(Math.floor(props.rateValue));
watchEffect(() => {
  rating.value = Math.floor(props.rateValue);
});

const emits = defineEmits(["update"]);

const ChangeRating = (value: number) => {
  rating.value = value;
  emits("update", value);
};
</script>

<template>
  <div class="text-sm group">
    <p
      class="text-neutral400 flex-1 w-full font-semibold mb-1 text-sm line-clamp-1 group-hover:font-bold"
    >
      {{ $t(label) }}
    </p>
    <div
      class="text-right w-full border-[1.5px] border-neutral500 hover:border-primaryvar1 rounded bg-light400 bg-opacity-30 transition-all duration-300 ease-in-out"
    >
      <Menu as="div" class="relative w-full inline-block text-left">
        <div>
          <MenuButton
            v-slot="{ open }"
            class="justify-center py-[0.4rem] w-full px-4"
          >
            <div
              class="w-full justify-between group flex gap-2 items-center hover:cursor-pointer"
            >
              <h1
                class="transition-colors ease-in-out duration-300 font-semibold truncate"
                :class="!value ? 'text-neutral400' : 'text-neutral400'"
              >
                {{ value ? value : $t("select") }}
              </h1>
              <Icon
                name="ic:round-keyboard-arrow-down"
                class="group-hover:text-primaryvar1 text-neutral400 w-4 h-4"
                :class="{ 'rotate-180': open, 'text-primaryvar1': open }"
              ></Icon>
            </div>
          </MenuButton>
        </div>

        <transition
          enter-active-class="transition duration-100 ease-out"
          enter-from-class="transform scale-95 opacity-0"
          enter-to-class="transform scale-100 opacity-100"
          leave-active-class="transition duration-75 ease-in"
          leave-from-class="transform scale-100 opacity-100"
          leave-to-class="transform scale-95 opacity-0"
        >
          <MenuItems
            class="absolute z-10 max-h-[28rem] overflow-y-auto min-w-max w-full mt-3 left-0 top-8 origin-top-right divide-y divide-light300 rounded-md bg-light400 shadow-xl ring-1 ring-dark200 ring-opacity-5 focus:outline-none"
          >
            <div class="px-1 py-1">
              <MenuItem
                v-for="item in props.items"
                :key="item?.id"
                v-slot="{ active, close }"
              >
                <h1
                  @click="handleClick(item, close)"
                  class="transition-all ease-in-out duration-300 font-semibold"
                  :class="[
                    active
                      ? 'bg-primaryvar1 text-light200 cursor-pointer'
                      : 'text-neutral200 ',
                    'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                  ]"
                >
                  {{ item?.name }}
                </h1>
              </MenuItem>
            </div>
          </MenuItems>
        </transition>
      </Menu>
    </div>
    <p
      :visible="errorMessage"
      class="px-1 text-xs font-medium text-red mb-1"
      id="email-error"
    >
      {{ errorMessage || "" }} &nbsp;
    </p>
  </div>
</template>

<script setup lang="ts">
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
import { useField } from "vee-validate";

type Items = {
  id: string | number;
  name: string | undefined;
  longitude?: number;
  latitiude?: number;
};
interface Props {
  items: Array<Items>;
  name: string;
  label: string;
  selectedValue?: any;
}
const props = defineProps<Props>();
const { value, errorMessage, setValue } = useField(props.name, "required", {
  initialValue: props.selectedValue?.name,
});

const emit = defineEmits(["update:selectedValue"]);
const handleClick = (item: any, close: any) => {
  setValue(item?.name);
  emit("update:selectedValue", item);
  close();
};
</script>

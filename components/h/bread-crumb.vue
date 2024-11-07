<template>
  <nav
    aria-label="breadcrumb"
    :class="breadCrumbClass ? breadCrumbClass : 'w-fit px-4  text-light200'"
  >
    <ol class="flex space-x-2 items-center">
      <li v-if="showHomeIcon" class="flex items-center h-full">
        <p class="hover:underline h-full flex items-center">
          <Icon
            :name="homeIcon ? homeIcon : 'mdi:folder-home'"
            :class="
              homeIconClass
                ? homeIconClass
                : 'w-5 h-5 text-neutral400 cursor-pointer hover:text-primary hover:underline'
            "
          />
        </p>
      </li>
      <li
        v-for="key in _hashMap"
        :key="key[0]"
        class="flex items-center h-full"
      >
        <div class="flex gap-1 items-center h-full">
          <span class="">/</span>
          <p
            @click="() => handleClick(key[0])"
            :class="
              linkClass
                ? linkClass
                : 'px-1 capitalize hover:underline text-sm  hover:text-primary font-semibold cursor-pointer'
            "
          >
            {{
              key[1].startsWith("category-")
                ? key[1].split("-")[1].replaceAll("%20", " ")
                : key[1].replaceAll("%20", " ")
            }}
          </p>
        </div>
      </li>
    </ol>
  </nav>
</template>

<script lang="ts" setup>
interface PropsInterface {
  showHomeIcon?: boolean;
  breadCrumbClass?: string;
  homeIcon?: string;
  homeIconClass?: string;
  linkClass?: string;
}
const hashMap = new Map<string, string>();
const _hashMap = ref(hashMap);

const route = useRoute();
const router = useRouter();
const props = withDefaults(defineProps<PropsInterface>(), {
  showHomeIcon: false,
});

const handleClick = (path: string) => {
  router.push(path);
};

const formHashMap = (fullPath: string) => {
  _hashMap.value.clear();
  const array = fullPath.split("/");
  const pathArray = array.splice(1, array.length);

  let key = "";
  pathArray.map((x) => {
    key += "/" + x;

    if (x.includes("-"))
      _hashMap.value.set(
        key,
        x.substring(x.indexOf("-") + 1, x.lastIndexOf("-"))
      );
    else _hashMap.value.set(key, x);
  });
};
formHashMap(route.path);

watch(
  () => route.path,
  (currentPath: string) => {
    formHashMap(currentPath);
  }
);
</script>

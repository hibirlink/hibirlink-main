<template>
  <div class="mb-4">
    <QuillEditor
      :class="
        props.quillClass ? props.quillClass : 'min-h-[5.2rem] px-3 border-none'
      "
      theme="snow"
      v-model:content="quillContent"
      :placeholder="placeholder"
      :toolbar="['minimal']"
      :read-only="true"
    />
  </div>
</template>
<script setup lang="ts">
import { Delta, QuillEditor } from "@vueup/vue-quill";
import "quill/dist/quill.core.css";
import "quill/dist/quill.bubble.css";
import "quill/dist/quill.snow.css";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
const quillContent = ref();

interface QuillPropsInterface {
  quillClass?: string;
  placeholder?: string;
  toolbar?: string;
  content: any;
  name: string;
  rules?: string;
  label: string;
}
const props = defineProps<QuillPropsInterface>();
if (props.content) {
  quillContent.value = new Delta(props.content);
}
</script>

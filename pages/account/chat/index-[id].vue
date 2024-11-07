<template>
  <main class="h-[calc(100vh-6rem)] flex flex-col gap-4">
    <div class="flex-1 w-full flex items-center gap-4">
      <!-- <button type="button">
        <Icon
          name="material-symbols:arrow-back-rounded"
          class="w-7 h-7 text-neutral200 hover:text-dark100"
        />
      </button> -->
      <div>
        <div class="font-bold text-dark100 line-clamp-1">
          Firstname Lastname
        </div>
        <div class="text-neutral200 font-medium line-clamp-1">
          last seen {{ new Date().toString().slice(0, 21) }}
        </div>
      </div>
      <h-menu
        leading_icon="bx:dots-vertical-rounded"
        @optionClicked.stop="handleAction"
        class="ml-auto self-end"
        :menu="{
          id: 'chat-id',
          actions: [MenuActions.CLEARHISTORY, MenuActions.DELETECHAT],
        }"
      />
    </div>

    <div ref="chatList" class="flex-auto h-full overflow-y-auto">
      <ul class="w-full" v-for="(message, i) in messages" :key="i">
        <li
          class="flex items-end gap-1"
          v-if="message.type === MessageType.OTHER"
        >
          <img
            src="https://source.unsplash.com/50x50/?portrait"
            alt=""
            class="w-8 h-8 border rounded-full bg-neutral300 border-neutral500"
          />
          <div class="-mb-4">
            <div
              v-for="(content, i) in message.contents"
              :key="i"
              class="bg-neutral600 xl:max-w-lg max-w-sm p-3 rounded-r-lg rounded-tl-lg my-1.5"
            >
              <p>
                {{ content }}
              </p>
            </div>
            <small>{{ message.date }}</small>
          </div>
        </li>

        <li class="self-end flex flex-col gap-0.5 items-end mt-4" v-else>
          <div
            v-for="(content, i) in message.contents"
            :key="i"
            class="bg-primaryvar3 xl:max-w-lg max-w-sm p-3 rounded-l-lg rounded-tr-lg my-0.5"
          >
            <p>{{ content }}</p>
          </div>
          <small class="">{{ message.date }}</small>
        </li>
      </ul>
    </div>

    <div
      class="flex-1 flex items-end gap-4 bg-light400 p-3 rounded shadow-[0px_0px_24px_8px_rgba(220,220,220,0.3)]"
    >
      <Icon
        name="mdi:paperclip-plus"
        class="text-neutral200 w-6 h-6 hover:text-primary cursor-pointer"
      />

      <textarea
        v-model="message"
        ref="chatField"
        :rows="1"
        @keyup="handleKeyup($event)"
        class="textarea resize-ta w-full appearance-none resize-none border-none outline-none focus:border-none focus:outline-none"
        placeholder="Write a message..."
      ></textarea>

      <button type="button" class="cursor-pointer" @click="sendMessage">
        <Icon
          name="fluent:send-48-filled"
          class="w-7 h-7 text-neutral200 hover:text-primary"
        />
      </button>
    </div>
  </main>
</template>

<script setup lang="ts">
enum MenuActions {
  CLEARHISTORY = "Clear History",
  DELETECHAT = "Delete Chat",
}
enum MessageType {
  ME = "me",
  OTHER = "other",
}
interface Messages {
  type: MessageType;
  contents: Array<string | undefined>;
  date: Date | string;
}
const route = useRoute();

const chatField = ref();
const chatList = ref();
function calcHeight(value: any) {
  let numberOfLineBreaks = (value.match(/\n/g) || []).length;
  // min-height + lines x line-height + padding + border
  let newHeight = 20 + numberOfLineBreaks * 20 + 12 + 2;
  return newHeight;
}
const handleKeyup = (event: any) => {
  chatField.value.style.height = calcHeight(chatField.value.value) + "px";
};
const message = ref<string>();
const sendMessage = () => {
  if (
    messages.length > 0 &&
    messages[messages.length - 1].type == MessageType.ME
  ) {
    messages[messages.length - 1].contents.push(message.value);
  } else {
    messages.push({
      type: MessageType.ME,
      contents: [message.value],
      date: new Date().toString().slice(0, 21),
    });
  }
  message.value = undefined;
  setTimeout(() => {
    chatList.value.scrollTop = chatList.value.scrollHeight + 1000;
  }, 500);
};

const messages = reactive<Array<Messages>>([
  {
    type: MessageType.ME,
    contents: ["Lorem ipsum"],
    date: new Date().toString().slice(0, 21),
  },
  {
    type: MessageType.OTHER,
    contents: [
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilisipsa ullam repellat!",
      "Lorem ipsum dolor si",
    ],
    date: new Date().toString().slice(0, 21),
  },
  {
    type: MessageType.ME,
    contents: ["Lorem ipsum"],
    date: new Date().toString().slice(0, 21),
  },
  {
    type: MessageType.OTHER,
    contents: [
      "Lorem ipsum dolor sit amet consectetur adipisicing!",
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilisipsa ullam repellat!",
    ],
    date: new Date().toString().slice(0, 21),
  },
  {
    type: MessageType.ME,
    contents: ["Lorem ipsum dolor sit amet consectetur adipisicing elit."],
    date: new Date().toString().slice(0, 21),
  },
  {
    type: MessageType.OTHER,
    contents: [
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilisipsa ullam repellat!",
    ],
    date: new Date().toString().slice(0, 21),
  },
  {
    type: MessageType.ME,
    contents: [
      "Lorem ipsum dolor sit amet . Facilisipsa ullam!",
      "Lorem ipsum dolor",
    ],
    date: new Date().toString().slice(0, 21),
  },
]);

const handleAction = (id: string, action: MenuActions) => {};

onMounted(() => {
  chatList.value.scrollTop = chatList.value.scrollHeight;
});
definePageMeta({
  layout: "custom",
  middleware: "before-entry",
});
</script>

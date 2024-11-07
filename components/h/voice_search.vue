<template>
  <div
    class="text-2xl text-light400 bg-primary h-full flex items-center cursor-pointer"
  >
    <Icon @click="toggleListening" name="uil:microphone" v-if="!start" />
    <Icon v-else @click="toggleListening" name="uil:microphone-slash" />
  </div>
</template>

<script setup lang="ts">
const searchQuery = ref("");
const start = ref(false);

const emits = defineEmits(["speak"]);

let recognition: any = "";

const toggleListening = () => {
  if (start.value) {
    stopListening();
  } else {
    startListening();
  }
};

const startListening = () => {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    console.error("Speech recognition is not supported in this browser.");
    return;
  }

  recognition = new SpeechRecognition();

  // Configure speech recognition settings
  recognition.lang = "en-US";
  recognition.continuous = false;

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    searchQuery.value = transcript;
    emits("speak", searchQuery.value);
  };

  recognition.onerror = (event) => {
    start.value = false;
    console.error("Speech recognition error:", event.error);
  };

  recognition.onend = () => {
    start.value = false;
    console.log("Speech recognition ended");
  };

  // Start speech recognition
  recognition.start();
  start.value = true;
};

const stopListening = () => {
  if (recognition) {
    recognition.stop();
    start.value = false;
  }
};

onBeforeUnmount(() => {
  stopListening();
});
</script>

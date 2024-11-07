<template>
  <main class="min-h-full relative">
    <nuxt-img
      src="./bg2.jpg"
      format="webp"
      loading="lazy"
      quality="100"
      fit="contain"
      sizes="md:100vw sm:100vw"
      class="h-[100vh] w-[100vw] absolute -top-[3.7rem] left-0 right-0 bottom-0 z-0"
    />
    <div
      class="h-[100vh] w-[100vw] absolute -top-[3.7rem] left-0 right-0 bottom-0 z-0 bg-light400 bg-opacity-20"
    />
    <section
      class="min-h-[calc(100vh-3.7rem)] relative max-w-[90rem] mx-auto px-4 flex flex-col items-center justify-start pt-32 gap-10"
    >
      <h1 class="font-extrabold md:text-4xl text-2xl text-dark100 text-center">
        We <span class="text-primary">@hibirlink</span> Connect Everything.
      </h1>

      <p
        class="text-center 4xl:w-5/6 md:w-4/5 mx-auto font-medium text-dark100 4xl:text-base 2xl:text-md lg:text-sm text-base"
      >
        Welcome! Hibirlink is an online ecosystem that seamlessly combines an
        online product marketplace, trusted delivery services, streamlined
        service provider connections, and a flexible online auction system. With
        Hibirlink, you can easily access high-quality products and services at
        fair prices, while also benefiting from reliable delivery options.
        Moreover, Hibirlink presents an opportunity for service providers and
        product suppliers to reach a wide customer base. We are also working to
        introduce a flexible online auction system, which will further enhance
        the user experience. Join our community today and begin experiencing the
        difference.
      </p>
      <div
        class="flex md:flex-row flex-col items-center justify-center w-full gap-6 mt-6"
      >
        <h-button
          btn-name="join_hibirlink_market"
          type="button"
          :rounded="false"
          btn-name-class="text-light300 font-bold text-lg mx-4 my-2"
          btn-class="bg-gradient-to-r from-purple to-primary px-7 py-4 rounded-sm"
          btn-height="h-11"
        />
        <h-button
          btn-name="join_hibirlink_delivery"
          type="button"
          :rounded="false"
          :outlined="true"
          outlined-class="group border-2 border-dark100 px-6 py-3 rounded-sm backdrop-blur"
          btn-name-class="text-dark100 font-bold text-lg mx-3 my-1.5 transition-all ease-in-out duration-200 box-border"
          btn-height="h-11"
        />
      </div>
    </section>

    <section
      class="max-w-[90rem] mx-auto flex flex-col items-center justify-center md:gap-16 gap-6 lg:px-24 md:px-4 sm:px-8 px-4 pt-20"
    >
      <h1 class="md:text-2xl text-xl font-extrabold text-dark200">
        Find out more!
      </h1>
      <div
        class="flex md:items-start items-center justify-center md:gap-x-16 gap-y-3 md:flex-row flex-col-reverse"
      >
        <nuxt-link
          :to="{ name: 'services-index' }"
          class="relative group flex-1 flex flex-col md:items-end items-center gap-3 px-8 py-4 cursor-pointer rounded-sm hover:bg-light400 hover:bg-opacity-40 hover:shadow-[0px_0px_24px_8px_rgba(130,130,130,0.2)] transition ease-in-out duration-300"
        >
          <h3
            class="text-dark100 group-hover:text-xl transition-all ease-in-out duration-300 text-lg font-bold"
          >
            {{ $t("services") }}
          </h3>
          <p
            class="md:text-end text-center text-neutral100 font-medium 4xl:text-base 2xl:text-md lg:text-sm text-base"
          >
            With our platform, you can easily find the right service either
            real-time or virtual for your needs. Our goal is to make it simple
            and hassle-free for you to find the right service at the right
            price, while also ensuring that providers are able to showcase their
            skills and connect with potential clients. And if you're a service
            provider, hibirlink is the perfect place to grow your business and
            connect with potential clients. Start serving or being served today!
          </p>
          <Icon
            name="ic:round-arrow-right-alt"
            class="text-neutral400 w-0 h-6 group-hover:w-6 cursor-pointer group-hover:animate-wiggle"
          />
        </nuxt-link>
        <div class="flex-1 sm:flex items-center justify-start hidden">
          <transition-fade>
            <nuxt-img
              src="/services.png"
              format="webp"
              sizes="md:172px sm:72px"
              loading="lazy"
              quality="100"
              class="py-4"
            />
          </transition-fade>
        </div>
      </div>

      <div
        class="flex md:flex-row flex-col md:items-start items-center justify-center md:gap-x-16 gap-y-3"
      >
        <div class="flex-1 sm:flex hidden items-center justify-end">
          <nuxt-img
            src="/products.png"
            format="webp"
            sizes="md:224px sm:86px"
            loading="lazy"
            quality="100"
          />
        </div>
        <nuxt-link
          :to="{ name: 'products-index' }"
          class="flex-1 group flex flex-col md:items-start items-center gap-3 px-8 py-4 cursor-pointer rounded-sm hover:bg-light400 hover:bg-opacity-40 hover:shadow-[0px_0px_24px_8px_rgba(130,130,130,0.2)] transition ease-in-out duration-300"
        >
          <h3
            class="text-dark100 group-hover:text-xl transition-all ease-in-out duration-300 text-lg font-bold"
          >
            {{ $t("products") }}
          </h3>
          <p
            class="md:text-start text-center text-neutral100 font-medium 4xl:text-base 2xl:text-md lg:text-sm text-base"
          >
            Our platform offers a vast selection of products that cater to all
            your needs, from physical products to digital items. With a
            user-friendly interface, secure payment options and reliable
            shipping service, you can shop with confidence and ease. And if
            you're a seller, hibirlink offers an exceptional platform for you to
            sell your products to a wide audience while retaining full control
            of your inventory.
          </p>
          <Icon
            name="ic:round-arrow-right-alt"
            class="text-neutral400 w-0 h-6 group-hover:w-6 cursor-pointer group-hover:animate-wiggle"
          />
        </nuxt-link>
      </div>

      <div
        class="flex md:flex-row flex-col-reverse items-center md:items-start justify-center md:gap-x-16 gap-y-3"
      >
        <nuxt-link
          :to="{ name: 'auction' }"
          class="flex-1 flex group flex-col md:items-end items-center gap-3 px-8 py-4 cursor-pointer rounded-sm hover:bg-light400 hover:bg-opacity-40 hover:shadow-[0px_0px_24px_8px_rgba(130,130,130,0.2)] transition ease-in-out duration-300"
        >
          <h3
            class="text-dark100 group-hover:text-xl transition-all ease-in-out duration-300 text-lg font-bold"
          >
            {{ $t("auction") }}
          </h3>
          <p
            class="md:text-end text-center text-neutral100 font-medium 4xl:text-base 2xl:text-md lg:text-sm text-base"
          >
            Our flexible and trustworthy platform provides a new and exciting
            way for you to buy and sell products. Whether you're looking to
            purchase unique items at a great price or sell your own products to
            a large audience, our online auction system is the perfect solution
            for you. Join our community today and discover the many benefits of
            our online auction system on hibirlink!
          </p>
          <Icon
            name="ic:round-arrow-right-alt"
            class="text-neutral400 w-0 h-6 group-hover:w-6 cursor-pointer group-hover:animate-wiggle"
          />
        </nuxt-link>
        <div class="flex-1 sm:flex hidden items-center justify-start">
          <nuxt-img
            src="/biding.png"
            format="webp"
            sizes="md:172px sm:72px"
            loading="lazy"
            quality="100"
            class="py-4"
          />
        </div>
      </div>

      <div
        class="flex md:flex-row flex-col items-center md:items-start justify-center md:gap-x-16 gap-y-3"
      >
        <div class="flex-1 sm:flex hidden items-center justify-end">
          <nuxt-img
            src="/delivery.png"
            format="webp"
            sizes="md:172px sm:72px"
            loading="lazy"
            quality="100"
            class="py-4"
          />
        </div>
        <nuxt-link
          :to="{ name: 'delivery' }"
          class="flex-1 group flex flex-col md:items-start items-center gap-3 px-8 py-4 cursor-pointer rounded-sm hover:bg-light400 hover:bg-opacity-40 hover:shadow-[0px_0px_24px_8px_rgba(130,130,130,0.2)] transition ease-in-out duration-300"
        >
          <h3
            class="text-dark100 group-hover:text-xl transition-all ease-in-out duration-300 text-lg font-bold"
          >
            {{ $t("delivery") }}
          </h3>
          <p
            class="md:text-start text-center text-neutral100 font-medium 4xl:text-base 2xl:text-md lg:text-sm text-base"
          >
            With our trusted delivery services, you can shop with confidence
            knowing that your products will be safely and promptly delivered to
            your doorstep. Our reliable delivery partners ensure that your
            products are handled with care and delivered to you in the shortest
            time possible. Whether you're purchasing products through our
            e-commerce site or our online auction system, we make sure that the
            delivery process is seamless and hassle-free.
          </p>
          <Icon
            name="ic:round-arrow-right-alt"
            class="text-neutral400 w-0 h-6 group-hover:w-6 cursor-pointer group-hover:animate-wiggle"
          />
        </nuxt-link>
      </div>
    </section>
    <div>
      <div class="fixed bottom-4 right-4">
        <button
          class="p-2 bg-white rounded-full shadow-lg relative"
          @click="isOpen = !isOpen"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            class="h-6 w-6"
          >
            <path
              fill-rule="evenodd"
              d="M10 1C4.477 1 0 5.477 0 11s4.477 10 10 10 10-4.477 10-10S15.523 1 10 1zM7 9a1 1 0 1 1 2 0 1 1 0 0 1-2 0zm3 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0zm3 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0z"
              clip-rule="evenodd"
            />
          </svg>
          <!-- <span
          class="w-4 h-4 rounded-[100%] bg-primary text-sm font-semibold text-light100 absolute -top-1"
          >1</span
        > -->
        </button>
      </div>

      <!-- Chatbot interface -->
      <transition
        enter-active-class="ease-out duration-300"
        leave-active-class="ease-in duration-200"
        appear
      >
        <div v-if="isOpen" class="fixed bottom-16 right-4 max-w-lg">
          <div class="bg-white rounded-lg shadow-lg">
            <div class="bg-gray-200 py-2">
              <h2
                class="text-lg font-semibold text-primaryvar2 w-full text-center"
              >
                HibirLink Chatbot
              </h2>
            </div>
            <div class="">
              <div
                class="h-[20rem] overflow-y-auto overflow-x-hidden px-4 py-4"
              >
                <div
                  class="max-w-xs mx-auto flex flex-col gap-2"
                  v-if="message"
                >
                  <div
                    :class="{
                      'bg-blue-200 -left-px relative text-blue-800 self-start py-2 before:contents[] before:w-4 before:h-2 before:bg-blue-200 before:absolute before:-left-1 before:bottom-0 before:rounded-tl-[100%]  w-fit pl-2 pr-4 rounded-lg mb-4 ':
                        mess.role == 'user',
                      'bg-blue-100 pl-4 relative text-blue-500 before:contents[] before:w-4 before:h-3 before:bg-blue-100 before:absolute before:-right-1 before:bottom-0 before:rounded-tr-[100%] self-end w-fit py-2 pr-2 rounded-lg mb-4':
                        mess.role == 'assistant',
                    }"
                    v-for="(mess, index) in message"
                    :key="index"
                  >
                    <p class="text-sm hyphens-auto">{{ mess.content }}</p>
                  </div>
                  <p class="px-2 py-1 w-fit text-primary my-2" v-if="typing">
                    <svg height="40" width="40">
                      <circle
                        class="dot"
                        cx="10"
                        cy="20"
                        r="3"
                        style="fill: grey"
                      />
                      <circle
                        class="dot"
                        cx="20"
                        cy="20"
                        r="3"
                        style="fill: grey"
                      />
                      <circle
                        class="dot"
                        cx="30"
                        cy="20"
                        r="3"
                        style="fill: grey"
                      />
                    </svg>
                  </p>
                </div>
              </div>
              <form
                class="mt-4 relative flex gap-0 justify-center items-center py-2 px-4"
                @submit.prevent="chat_now"
              >
                <input
                  type="text"
                  v-model="chat"
                  class="w-full border-gray-300 bg-primaryvar5/30 flex-1 rounded-lg shadow-sm focus:border-primaryvar3 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  placeholder="Type your message here"
                />
                <button type="submit" class="px-4 py-2 text-primary rounded-lg">
                  <Icon name="uil:message" class="w-6 h-6"></Icon>
                </button>
              </form>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </main>
</template>
<script setup lang="ts">
import { TransitionChild } from "@headlessui/vue";
const chat = ref("");
const isOpen = ref(false);
const typing = ref(false);
const message = ref([
  {
    role: "assistant",
    content: "Hello, how can I help you?",
  },
  {
    role: "assistant",
    content: "how can ask me anything you like about our services?",
  },
]);
const chat_now = async () => {
  message.value = [...message.value, { role: "user", content: chat.value }];
  chat.value = "";
  typing.value = true;
  const data = await $fetch("http://localhost:4000/chat", {
    method: "POST",
    body: { request: JSON.stringify(message.value) },
  });
  typing.value = false;
  message.value.push(data.message.choices[0].message);

  // message.value.choices.forEach((e) => {
  //   console.log(e);
  // });
};

useHead({
  title: "hibirlink",
});
definePageMeta({
  layout: "custom",
});

let recognition: any;
// if (process.client) recognition = new webkitSpeechRecognition();
</script>
<style scoped>
@keyframes blink {
  50% {
    fill: transparent;
  }
}
.dot {
  animation: 1s blink infinite;
  fill: grey;
}
.dot:nth-child(2) {
  animation-delay: 250ms;
}
.dot:nth-child(3) {
  animation-delay: 500ms;
}

.loader {
  background-color: #f1f1f1;

  color: grey;
}
</style>

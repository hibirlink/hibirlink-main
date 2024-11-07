// https://nuxt.com/docs/api/configuration/nuxt-config
import am from "./locals/am.json";
import en from "./locals/en.json";
import graphql from "@rollup/plugin-graphql";

const isDev = process.env.NODE_ENV === 'development';
export default defineNuxtConfig({
  define:{
    __DEV__ : isDev.toString()
  },

  vite: {
    plugins: [graphql()],
  },
  build: {
    transpile: ["graphql", "@apollo/client", "@vue/apollo-composable"],
  },
  app: {
    head: {
      charset: "utf-8",
      viewport: "width=500, initial-scale=1",
      meta: [
        {
          name: "description",
          content:
            "Welcome to Hibirlink! Our innovative system is designed to connect communities and improve their overall satisfaction by revolutionizing the way people share, sell, buy, use, provide, work, rest, and enjoy things. With Hibirlink, you can easily access high-quality products and services at fair prices, while also benefiting from trusted delivery options. Plus, we're proud to offer the very first flexible online auction system in Africa, making it easier than ever to find exactly what you're looking for. Join our community today and start experiencing the Hibirlink difference!",
        },
      ],
      link: [{ rel: "icon", href: "/favicon.svg" }],
    },
  },

  tailwindcss: {
    cssPath: "~/assets/css/tailwind.css",
    configPath: "tailwind.config",
    exposeConfig: false,
    //config: {},
    injectPosition: 0,
    viewer: true,
  },

  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/i18n",
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
    "@vueuse/nuxt",
    "@nuxt/image-edge",
    "@nuxtjs/device",
    "@nuxtjs/html-validator",
    "magic-regexp/nuxt",
    "nuxt-icon",
    "nuxt-lodash",
    "nuxt-typed-router",
    "nuxt-swiper",
    "nuxt-svgo",
    "nuxt-csurf",
  ],

  i18n: {
    // locales: ['en', 'am'],
    strategy: "no_prefix",
    // defaultLocale: 'en',
    vueI18n: {
      legacy: false,
      locale: "en",
      messages: {
        en: en,
        am: am,
      },
    },
  },

  runtimeConfig: {
    firebaseApiKey: "",
    firebaseAuthDomain: "",
    firebaseProjectId: "",
    storagePacket: "",
    firebaseMessageSenderId: "",
    firebaseAppId: "",
    wsEndpoint: "",
    graphqlEndpoint: "",
    restEndpoint: "",

    public: {
      firebaseApiKey: "",
      firebaseAuthDomain: "",
      firebaseProjectId: "",
      storagePacket: "",
      firebaseMessageSenderId: "",
      firebaseAppId: "",
      graphqlEndpoint: "",
      restEndpoint: "",
      wsEndpoint: ""
    },
  },

  htmlValidator: {},
});

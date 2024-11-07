<template>
  <main class="w-full min-h-screen flex flex-col font-nunito bg-light300">
    <section
      class="flex-1 min-h-full relative overflow-x-hidden pt-[3.7rem] w-full"
    >
      <nav
        class="w-full h-[3.7rem] fixed top-0 left-0 right-0 bg-light400 bg-opacity-0 flex items-center justify-between z-50 gap-8 backdrop-blur px-6"
      >
        <NuxtLink :to="{ name: 'index' }">
          <Logo class="scale-[0.71] -ml-3" />
        </NuxtLink>
        <div
          class="flex-1 flex justify-end items-center xl:gap-16 gap-8 text-dark200"
        >
          <ul class="lg:flex hidden items-center gap-8">
            <NuxtLink
              :class="{
                'router-link-active': /^\/services(?!(\/detail))+/i.test(
                  route.path
                ),
              }"
              :to="{ name: 'services-index' }"
              class="relative cursor-pointer flex items-center justify-center w-[6.7rem] h-8 font-semibold before:contnet-[''] after:contnet-[''] before:absolute after:absolute before:left-0 after:right-0 before:bottom-0 after:top-0 before:w-0 hover:before:w-full after:w-0 hover:after:w-full before:h-0 hover:before:h-full after:h-0 hover:after:h-full before:border-b-2 after:border-t-2 before:border-l-2 after:border-r-2 before:border-transparent hover:before:border-primary after:border-transparent hover:after:border-primary before:transition-all after:transition-all before:ease-in-out after:ease-in-out before:duration-300 after:duration-300 before:rounded-sm after:rounded-sm"
              >{{ $t("services") }}</NuxtLink
            >
            <NuxtLink
              :class="{
                'router-link-active': /^\/products(?!(\/detail))+/i.test(
                  route.path
                ),
              }"
              :to="{ name: 'products-index' }"
              class="relative cursor-pointer flex items-center justify-center w-[6.7rem] h-8 font-semibold before:contnet-[''] after:contnet-[''] before:absolute after:absolute before:left-0 after:right-0 before:bottom-0 after:top-0 before:w-0 hover:before:w-full after:w-0 hover:after:w-full before:h-0 hover:before:h-full after:h-0 hover:after:h-full before:border-b-2 after:border-t-2 before:border-l-2 after:border-r-2 before:border-transparent hover:before:border-primary after:border-transparent hover:after:border-primary before:transition-all after:transition-all before:ease-in-out after:ease-in-out before:duration-300 after:duration-300 before:rounded-sm after:rounded-sm"
              >{{ $t("products") }}</NuxtLink
            >

            <NuxtLink
              :class="{
                'router-link-active': /^\/next-rel(?!(\/detail))+/i.test(
                  route.path
                ),
              }"
              :to="{ name: 'auction' }"
              class="relative cursor-pointer flex items-center justify-center w-[6.7rem] h-8 font-semibold before:contnet-[''] after:contnet-[''] before:absolute after:absolute before:left-0 after:right-0 before:bottom-0 after:top-0 before:w-0 hover:before:w-full after:w-0 hover:after:w-full before:h-0 hover:before:h-full after:h-0 hover:after:h-full before:border-b-2 after:border-t-2 before:border-l-2 after:border-r-2 before:border-transparent hover:before:border-primary after:border-transparent hover:after:border-primary before:transition-all after:transition-all before:ease-in-out after:ease-in-out before:duration-300 after:duration-300 before:rounded-sm after:rounded-sm"
              >{{ $t("auction") }}</NuxtLink
            >
          </ul>

          <ul class="flex items-center xl:gap-10 gap-8">
            <li class="w-[0.15rem] h-5 rounded-full bg-neutral500"></li>
            <li
              class="font-bold text-sm hover:text-primary transition-colors duration-300 ease-in-out cursor-pointer flex items-center"
              @click="
                () => {
                  if (locale === 'en') locale = 'am';
                  else locale = 'en';
                }
              "
            >
              <Icon name="ion:language" /> {{ locale === "en" ? "Eng" : "አማ" }}
            </li>

            <li v-if="isUserSignedIn">
              <NuxtLink
                v-if="/^\/products+|\/account\/cart/i.test(route.path)"
                :to="{ name: 'account-cart' }"
                class="relative hover:text-primary cursor-pointer group transition-colors ease-in-out duration-200"
              >
                <Icon
                  name="solar:cart-large-minimalistic-bold-duotone"
                  class="w-6 h-6"
                />
                <div
                  class="absolute -top-1 left-2/4 bg-primaryvar1 group-hover:bg-neutral200 text-light400 text-xs font-bold h-4 w-fit px-1 rounded-full text-center transition-colors ease-in-out duration-200"
                >
                  {{ badge }}
                </div>
              </NuxtLink>

              <NuxtLink
                v-if="/^\/services+|\/account\/saved/i.test(route.path)"
                :to="{ name: 'account-saved' }"
                class="relative cursor-pointer group text-neutral200 hover:text-primary transition-colors ease-in-out duration-200"
              >
                <Icon name="solar:bookmark-bold-duotone" class="w-6 h-6" />
                <div
                  class="absolute -top-1 left-2/4 bg-primaryvar1 group-hover:bg-neutral200 text-light400 text-xs font-bold h-4 w-fit px-1 rounded-full text-center transition-colors ease-in-out duration-200"
                >
                  7
                </div>
              </NuxtLink>
            </li>

            <NuxtLink
              v-if="
                userRole === 'supplier' ||
                userRole === 'store_manager' ||
                userRole === 'guest'
              "
              to="http://localhost:3001"
              class="bg-gradient-to-r lg:flex hidden items-center justify-center gap-2 from-purple to-primary w-40 text-md py-1 font-semibold text-light300 rounded-sm ring-4 ring-transparent hover:ring-purple hover:ring-opacity-50 transition-all ease-in-out duration-200"
            >
              <Icon name="icon-park-solid:stock-market" class="" />
              {{ $t("supplier_chain") }}
            </NuxtLink>

            <NuxtLink
              v-else-if="isUserSignedIn"
              :to="{ name: 'register' }"
              class="bg-gradient-to-r lg:flex hidden items-center justify-center gap-2 from-purple to-primary w-40 text-md py-1 font-semibold text-light300 rounded-sm ring-4 ring-transparent hover:ring-purple hover:ring-opacity-50 transition-all ease-in-out duration-200"
            >
              <Icon name="icon-park-solid:stock-market" class="" />
              Join {{ $t("supplier_chain") }}
            </NuxtLink>

            <NuxtLink
              v-else
              :to="{ name: 'auth-signIn' }"
              class="bg-gradient-to-r lg:flex hidden items-center justify-center gap-2 from-purple to-primary w-40 text-md py-1 font-semibold text-light300 rounded-sm ring-4 ring-transparent hover:ring-purple hover:ring-opacity-50 transition-all ease-in-out duration-200"
            >
              <Icon name="icon-park-solid:stock-market" class="" />
              Join {{ $t("supplier_chain") }}
            </NuxtLink>

            <div
              class="group relative p-1 flex items-center justify-center transition-colors"
            >
              <Icon
                name="uil:user"
                class="w-6 h-6 text-dark200 group-hover:text-primary cursor-pointer transition-colors ease-in-out duration-200"
              />
              <Icon
                name="ic:round-keyboard-arrow-down"
                class="w-5 h-5 text-neutral200 group-hover:text-primary cursor-pointer group-hover:rotate-180 transition-all ease-in-out duration-200"
              />

              <div
                class="absolute hidden top-14 group-hover:flex group-hover:top-8 w-64 right-0 h-fit rounded flex-col items-center gap-4 p-4 bg-light400 shadow-[0px_0px_16px_6px_rgba(120,120,120,0.09)] transition-transform ease-in-out duration-300"
              >
                <div
                  class="absolute -top-2 right-2 rotate-45 w-5 h-5 bg-light400"
                ></div>
                <h6 class="font-bold text-neutral300">{{ $t("hello") }}!</h6>
                <div class="flex flex-col">
                  <h1 class="text-sm text-center">{{ name }}</h1>
                  <h1 class="text-xs text-center">{{ email }}</h1>
                </div>
                <NuxtLink :to="{ name: 'auth-signIn' }">
                  <h-button
                    v-if="!isUserSignedIn"
                    btn-name="sign_in"
                    type="button"
                    btn-class="min-w-[10rem] text-light400"
                  />
                </NuxtLink>

                <NuxtLink :to="{ name: 'auth-signUp' }">
                  <h-button
                    v-if="!isUserSignedIn"
                    btn-name="sign_up"
                    type="button"
                    outlined-class="min-w-[10rem] border-2 border-primary text-primaryvar1 hover:shadow-none"
                    :outlined="true"
                  />
                </NuxtLink>

                <h-button
                  v-if="isUserSignedIn"
                  @click="handleLogout"
                  btn-name="sign_out"
                  type="button"
                  btn-class="min-w-[10rem] text-light400"
                />

                <hr class="w-full py-1" />

                <h3 class="text-neutral300 font-semibold">
                  {{ $t("my") }}
                  <span class="text-primary">{{ $t("hibirlink") }}</span>
                </h3>

                <div class="flex flex-col items-start gap-1.5 w-full">
                  <nuxt-link :to="{ name: 'account-orders' }">
                    <span
                      class="text-neutral300 font-medium hover:font-semibold hover:text-primaryvar1 transition-all ease-in-out duration-200"
                      >{{ $t("orders") }}</span
                    ></nuxt-link
                  >
                  <nuxt-link :to="{ name: 'account' }">
                    <span
                      class="text-neutral300 font-medium hover:font-semibold hover:text-primaryvar1 transition-all ease-in-out duration-200"
                      >{{ $t("account") }}</span
                    ></nuxt-link
                  >
                </div>
              </div>
            </div>

            <div
              @click="
                () => {
                  openNav = true;
                }
              "
              class="pb-1 lg:hidden block"
            >
              <Icon
                name="ci:menu-alt-02"
                class="w-8 h-8 mt-2 text-dark200 hover:text-primary cursor-pointer transition-colors ease-in-out duration-200"
              />
            </div>
          </ul>
        </div>
      </nav>

      <div class="w-full min-h-full pb-16">
        <slot />
      </div>
    </section>

    <TransitionRoot as="template" :show="openNav" class="lg:hidden block">
      <Dialog as="div" class="relative z-50" @close="open = false">
        <TransitionChild
          as="template"
          enter="ease-in-out duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in-out duration-300"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div
            class="fixed inset-0 bg-neutral300 bg-opacity-50 transition-opacity"
          />
        </TransitionChild>

        <div class="fixed inset-0 overflow-hidden">
          <div class="absolute inset-0 overflow-hidden">
            <div
              class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10"
            >
              <TransitionChild
                as="template"
                enter="transform transition ease-in-out duration-300 sm:duration-300"
                enter-from="translate-x-full"
                enter-to="translate-x-0"
                leave="transform transition ease-in-out duration-300 sm:duration-300"
                leave-from="translate-x-0"
                leave-to="translate-x-full"
              >
                <DialogPanel
                  class="pointer-events-auto relative w-screen max-w-sm"
                >
                  <TransitionChild
                    as="template"
                    enter="ease-in-out duration-300"
                    enter-from="opacity-0"
                    enter-to="opacity-100"
                    leave="ease-in-out duration-300"
                    leave-from="opacity-100"
                    leave-to="opacity-0"
                  >
                    <div
                      class="absolute top-0 left-0 -ml-8 flex pt-4 pr-2 sm:-ml-10 sm:pr-4"
                    ></div>
                  </TransitionChild>
                  <div
                    ref="mobileNavTarget"
                    class="flex h-full flex-col overflow-y-auto font-nunito bg-light300 py-6 shadow-xl"
                  >
                    <div
                      class="px-4 sm:px-6 flex flex-col items-center justify-center"
                    >
                      <NuxtLink
                        :to="{ name: 'index' }"
                        @click="
                          () => {
                            openNav = false;
                          }
                        "
                      >
                        <Logo
                          class="scale-[0.71] outline-none border-none focus:border-none focus:outline-none"
                        />
                      </NuxtLink>
                      <h3 class="text-neutral300 font-semibold">
                        We Link Everything.
                      </h3>
                    </div>
                    <ul
                      class="relative flex-1 mt-6 px-4 sm:px-6 flex flex-col gap-4"
                    >
                      <NuxtLink
                        :class="{
                          'router-link-active':
                            /^\/services(?!(\/detail))+/i.test(route.path),
                        }"
                        :to="{ name: 'services-index' }"
                        @click="
                          () => {
                            openNav = false;
                          }
                        "
                        class="relative h-11 rounded flex gap-2 items-center justify-start font-bold px-4 text-neutral300 before:contnet-[''] after:contnet-[''] before:absolute after:absolute before:left-0 after:right-0 before:bottom-0 after:top-0 before:w-0 hover:before:w-full after:w-0 hover:after:w-full before:h-0 hover:before:h-full after:h-0 hover:after:h-full before:border-b-2 after:border-t-2 before:border-l-2 after:border-r-2 before:border-transparent hover:before:border-primary after:border-transparent hover:after:border-primary before:transition-all after:transition-all before:ease-in-out after:ease-in-out before:duration-300 after:duration-300 before:rounded-sm after:rounded-sm"
                      >
                        <Icon name="mingcute:service-fill" class="w-5 h-5" />
                        {{ $t("services") }}</NuxtLink
                      >
                      <NuxtLink
                        :class="{
                          'router-link-active':
                            /^\/products(?!(\/detail))+/i.test(route.path),
                        }"
                        :to="{ name: 'products-index' }"
                        @click="
                          () => {
                            openNav = false;
                          }
                        "
                        class="relative h-11 rounded flex gap-2 items-center justify-start text-neutral300 font-bold px-4 before:contnet-[''] after:contnet-[''] before:absolute after:absolute before:left-0 after:right-0 before:bottom-0 after:top-0 before:w-0 hover:before:w-full after:w-0 hover:after:w-full before:h-0 hover:before:h-full after:h-0 hover:after:h-full before:border-b-2 after:border-t-2 before:border-l-2 after:border-r-2 before:border-transparent hover:before:border-primary after:border-transparent hover:after:border-primary before:transition-all after:transition-all before:ease-in-out after:ease-in-out before:duration-300 after:duration-300 before:rounded-sm after:rounded-sm"
                      >
                        <Icon name="ep:goods" class="w-5 h-5" />{{
                          $t("products")
                        }}</NuxtLink
                      >
                      <NuxtLink
                        :class="{
                          'router-link-active':
                            /^\/nextrel(?!(\/detail))+/i.test(route.path),
                        }"
                        :to="{ name: 'auction' }"
                        @click="
                          () => {
                            openNav = false;
                          }
                        "
                        class="relative h-11 rounded flex gap-2 items-center justify-start text-neutral300 font-bold px-4 before:contnet-[''] after:contnet-[''] before:absolute after:absolute before:left-0 after:right-0 before:bottom-0 after:top-0 before:w-0 hover:before:w-full after:w-0 hover:after:w-full before:h-0 hover:before:h-full after:h-0 hover:after:h-full before:border-b-2 after:border-t-2 before:border-l-2 after:border-r-2 before:border-transparent hover:before:border-primary after:border-transparent hover:after:border-primary before:transition-all after:transition-all before:ease-in-out after:ease-in-out before:duration-300 after:duration-300 before:rounded-sm after:rounded-sm"
                      >
                        <Icon name="ri:auction-line" class="w-5 h-5" />{{
                          $t("auction")
                        }}</NuxtLink
                      >
                    </ul>
                    <hr class="w-3/4 self-center py-2" />

                    <NuxtLink
                      v-if="
                        userRole === 'supplier' ||
                        userRole === 'store_manager' ||
                        userRole === 'guest'
                      "
                      to="http://localhost:3001"
                      class="bg-gradient-to-r self-center flex items-center justify-center gap-2 from-purple to-primary w-44 py-2 font-bold text-light300 rounded-sm ring-4 ring-transparent hover:ring-purple hover:ring-opacity-50 transition-all ease-in-out duration-200"
                    >
                      <Icon
                        name="icon-park-solid:stock-market"
                        class="w-5 h-5 text-light400"
                      />
                      {{ $t("supplier_chain") }}
                    </NuxtLink>

                    <NuxtLink
                      v-else-if="userRole === 'customer'"
                      :to="{ name: 'register' }"
                      class="bg-gradient-to-r self-center flex items-center justify-center gap-2 from-purple to-primary w-44 py-2 font-bold text-light300 rounded-sm ring-4 ring-transparent hover:ring-purple hover:ring-opacity-50 transition-all ease-in-out duration-200"
                    >
                      <Icon
                        name="icon-park-solid:stock-market"
                        class="w-5 h-5 text-light400"
                      />
                      {{ $t("supplier_chain") }}
                    </NuxtLink>
                    <NuxtLink
                      :to="{ name: 'auth-signIn' }"
                      v-else="userRole === ''"
                      class="bg-gradient-to-r self-center flex items-center justify-center gap-2 from-purple to-primary w-44 py-2 font-bold text-light300 rounded-sm ring-4 ring-transparent hover:ring-purple hover:ring-opacity-50 transition-all ease-in-out duration-200"
                    >
                      <Icon
                        name="icon-park-solid:stock-market"
                        class="w-5 h-5 text-light400"
                      />
                      {{ $t("supplier_chain") }}
                    </NuxtLink>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>

    <footer class="px-4 divide-y w-full bg-light200">
      <div
        class="container flex flex-col justify-between py-10 mx-auto space-y-8 lg:flex-row lg:space-y-0"
      >
        <div class="lg:w-1/3">
          <nuxt-link
            rel="noopener noreferrer"
            :to="{ name: 'index' }"
            class="flex justify-start items-end gap-3 lg:justify-start"
          >
            <img src="/favicon.svg" class="self-end" />
            <h3 class="text-xl font-bold text-dark200 self-end">
              {{ $t("hibirlink") }}
            </h3>
          </nuxt-link>
        </div>
        <div
          class="grid grid-cols-2 text-sm gap-x-3 gap-y-8 lg:w-2/3 sm:grid-cols-4"
        >
          <div class="space-y-3 self-center text-sm text-dark100">
            <h3 class="tracking-wide uppercase font-semibold">
              {{ $t("products") }}
            </h3>
            <ul class="space-y-1">
              <li>
                <a rel="noopener noreferrer" href="#"
                  >{{ $t("physical") }} {{ $t("products") }}</a
                >
              </li>
              <li>
                <a rel="noopener noreferrer" href="#"
                  >{{ $t("digital") }} {{ $t("products") }}</a
                >
              </li>
              <li>
                <a rel="noopener noreferrer" href="#">{{
                  $t("sell_on_hibirlink")
                }}</a>
              </li>
              <li>
                <a rel="noopener noreferrer" href="#">{{ $t("employees") }}</a>
              </li>
            </ul>
          </div>
          <div class="space-y-3 text-sm text-dark100">
            <h3 class="tracking-wide uppercase font-semibold">
              {{ $t("services") }}
            </h3>
            <ul class="space-y-1">
              <li>
                <a rel="noopener noreferrer" href="#"
                  >{{ $t("real_time") }} {{ $t("services") }}</a
                >
              </li>
              <li>
                <a rel="noopener noreferrer" href="#"
                  >{{ $t("virtual") }} {{ $t("services") }}</a
                >
              </li>
              <li>
                <a rel="noopener noreferrer" href="#">{{
                  $t("provide_services")
                }}</a>
              </li>
              <li>
                <a rel="noopener noreferrer" href="#">{{ $t("employees") }}</a>
              </li>
            </ul>
          </div>
          <div class="space-y-3 text-sm text-dark100">
            <h3 class="uppercase font-semibold">
              {{ $t("auction") }}
            </h3>
            <ul class="space-y-1">
              <li>
                <a rel="noopener noreferrer" href="#">{{ $t("closed") }}</a>
              </li>
              <li>
                <a rel="noopener noreferrer" href="#">{{ $t("open") }}</a>
              </li>
              <li>
                <a rel="noopener noreferrer" href="#">{{ $t("setup") }}</a>
              </li>
              <li>
                <a rel="noopener noreferrer" href="#">{{
                  $t("participate")
                }}</a>
              </li>
            </ul>
          </div>

          <div class="space-y-3 text-sm text-dark100">
            <h3 class="uppercase font-semibold">{{ $t("delivery") }}</h3>
            <ul class="space-y-1">
              <li>
                <a rel="noopener noreferrer" href="#">{{
                  $t("join_hibirlink_delivery")
                }}</a>
              </li>
              <li>
                <a rel="noopener noreferrer" href="#">{{ $t("partners") }}</a>
              </li>
              <li>
                <a rel="noopener noreferrer" href="#">{{ $t("employees") }}</a>
              </li>
            </ul>
          </div>

          <div class="space-y-3 text-sm text-dark100">
            <div class="uppercase font-semibold">
              {{ $t("social_media") }}
            </div>
            <div class="flex justify-start space-x-3">
              <a
                rel="noopener noreferrer"
                href="mailto:hibirlink@gmail.com"
                title="email"
                class="flex items-center p-1"
              >
                <Icon name="majesticons:mail" class="w-6 h-6 text-dark200" />
              </a>
              <a
                rel="noopener noreferrer"
                href="#"
                title="Twitter"
                class="flex items-center p-1"
              >
                <Icon name="mdi:twitter" class="w-6 h-6 text-dark200" />
              </a>
              <a
                rel="noopener noreferrer"
                href="#"
                title="Twitter"
                class="flex items-center p-1"
              >
                <Icon name="mdi:linkedin" class="w-6 h-6 text-dark200" />
              </a>
              <a
                rel="noopener noreferrer"
                href="#"
                title="Facebook"
                class="flex items-center p-1"
              >
                <Icon name="mdi:facebook" class="w-6 h-6 text-dark200" />
              </a>
              <a
                rel="noopener noreferrer"
                href="#"
                title="Instagram"
                class="flex items-center p-1"
              >
                <Icon name="ri:instagram-fill" class="w-6 h-6 text-dark200" />
              </a>
              <a
                rel="noopener noreferrer"
                href="#"
                title="Twitter"
                class="flex items-center p-1"
              >
                <Icon name="ion:logo-tiktok" class="w-6 h-6 text-dark200" />
              </a>
              <a
                rel="noopener noreferrer"
                href="#"
                title="Twitter"
                class="flex items-center p-1"
              >
                <Icon
                  name="ic:baseline-telegram"
                  class="w-6 h-6 text-dark200"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div
        class="py-6 text-sm text-dark200 flex items-center justify-center gap-x-8 gap-y-4"
      >
        <span>©2023 hibirlink.com, All rights reserved</span>
        <a rel="noopener noreferrer" href="#" class="hover:underline">
          Privacy policy
        </a>
        <a rel="noopener noreferrer" href="#" class="hover:underline">
          Terms of service
        </a>
        <a rel="noopener noreferrer" href="#" class="hover:underline">
          Help center
        </a>
      </div>
    </footer>
  </main>
</template>

<style scoped>
.router-link-active {
  color: #306ee8;
  font-weight: 600;
}
.router-link-active::before {
  width: 100%;
  height: 100%;
  border-color: #306ee8;
  border-radius: 0.125rem;
}
.router-link-active::after {
  width: 100%;
  height: 100%;
  border-color: #306ee8;
  border-radius: 0.125rem;
}
</style>

<script setup lang="ts">
import Logo from "@/assets/icons/logo.svg";
import { useStore } from "~/store/data";
import category from "~/apollo/query/service/realtime/category.gql";
import region_city_gql from "~/apollo/query/fetch_region.gql";
import sub_city_gql from "~/apollo/query/fetch_subcity.gql";
import virtual_service_categoryGQl from "~/apollo/query/service/virtual/fetch_category.gql";
import physical_product_category from "~/apollo/query/product/realtime/fetch_category.gql";
import physical_product_subcategory from "~/apollo/query/product/realtime/fetch_sub_category.gql";
import virtual_product_category from "~/apollo/query/product/virtual/fetch_category.gql";
import total_cart from "~/apollo/query/fetch_total_cart.gql";

import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { useAuth } from "~~/store/auth";
import { storeToRefs } from "pinia";
import logout from "@/apollo/mutation/logout.gql";

const { locale } = useI18n();
const route = useRoute();
const openNav = ref<boolean>(false);
const mobileNavTarget = ref(null);

const store = useStore();
const authStore = useAuth();
const { token, role, name, email, uid } = storeToRefs(authStore);
const isUserSignedIn = computed(() => token.value);

onClickOutside(mobileNavTarget, (event) => {
  openNav.value = false;
});

const cart_quary_enable = ref(false);
const isLoading = ref<boolean>(false);
const variable = computed(() => {
  return { user_id: uid?.value };
});
const { result, onResult, onError } = useCustomQuery(
  total_cart,
  variable,
  0,
  cart_quary_enable
);

watch(token, (value) => {
  console.log(value);
  if (value) {
    cart_quary_enable.value = true;
  } else {
    cart_quary_enable.value = false;
  }
});

const badge = computed(() => {
  return result.value?.total?.cart?.count ?? 0;
});
const {
  mutate: logOut,
  onError: onLogoutError,
  onDone: onLogoutResult,
} = useCustomMutation(logout);

const {
  result: category_result,
  onError: onCategoryError,
  loading: categoryLoading,
  onResult: onRTSCategory,
} = useCustomQuery(category);

const {
  result: virtual_product_Cresult,
  onError: onVPCategoryError,
  loading: VPLoading,
  onResult: onVPCategory,
} = useCustomQuery(virtual_product_category);

const {
  result: physical_product_category_result,
  onError: onPhysicalProductCategoryError,
  loading: physicalProductLoading,
  onResult: onPPCategory,
} = useCustomQuery(physical_product_category);
const {
  result: region_result,
  onError: onRegionError,
  loading: regionLoading,
  onResult: onRegionResult,
} = useCustomQuery(region_city_gql);
const {
  result: sub_city_result,
  onError: onSubCityError,
  loading: subCityLoading,
  onResult: onSubCityResult,
} = useCustomQuery(sub_city_gql);

const {
  result: sub_category_result,
  onError: onSubcategoryError,
  loading: subCategoryLoading,
  onResult: onSubCategoryResult,
} = useCustomQuery(physical_product_subcategory);

const { onResult: onVirtualServiceCategoryResult } = useCustomQuery(
  virtual_service_categoryGQl
);

onVirtualServiceCategoryResult((result) => {
  const data = result.data?.category;
  if (data) {
    const temp_category = data.map((element: any) => {
      return {
        id: element.id,
        name: element.name.to,
        logo: element.logo,
      };
    });

    store.setVirtualServiceCategory(temp_category);
  }
});

onVPCategory((result) => {
  const data = result.data?.category;

  if (data) {
    const temp_category = data?.map((element: any) => {
      return {
        id: element?.id,
        name: element?.name?.to,
        logo: element?.logo,
      };
    });

    store.setVirtualProductCategory(temp_category);
  }
});

onVPCategoryError((error) => {
  console.log(error, "...fetch_virtual_product_category");
});

onRegionError((error) => {
  console.log(error);
});

onPPCategory((result) => {
  let temp_cat = result.data?.category;
  if (temp_cat) {
    temp_cat = temp_cat.map((element: any) => {
      return {
        id: element.id,
        name: element.name.to,
        logo: element.logo,
      };
    });
    store.setPhysicalProductCategory(temp_cat);
  }
});

onSubCategoryResult((result) => {
  let temp_sub = result.data?.subcategory;
  if (temp_sub) {
    temp_sub = temp_sub.map((element: any) => {
      return {
        id: element.id,
        name: element.name.to,
        logo: element.logo,
        category_id: element.category_id,
      };
    });

    store.setPhysicalProductSubCategory(temp_sub);
  }
});

onRegionResult((result) => {
  console.log(result);
  const data = result.data?.region_city;
  if (data) {
    let temp_region = data.map((element: any) => {
      return {
        id: element.id,
        longitude: element.longitude,
        latitude: element.latitude,
        name: element.name.to.map((value: any) => {
          return {
            name: value.name,
            type: value.type,
          };
        }),
      };
    });

    store.setRegionCity(temp_region);
  }
});

onSubCityResult((result) => {
  const data = result.data?.sub_city;
  if (data) {
    let temp_sub_city = data.map((element: any) => {
      return {
        id: element.id,
        region_id: element.city_region_id,
        longitude: element.longitude,
        latitude: element.latitude,
        name: element.name.to.map((value: any) => {
          return {
            name: value.name,
            type: value.type,
          };
        }),
      };
    });

    store.setSubCity(temp_sub_city);
  }
});

onRTSCategory((result) => {
  console.log(result.data?.category);
  let cat = result.data?.category;
  let custom_category = cat?.map((element: any) => {
    return {
      id: element.id,
      logo: element.logo,
      name: element.name.to,
    };
  });
  store.setRealTimeServiceCategory(custom_category);
});

onLogoutResult((result) => {
  const { setToken, setUID, setName, setRole, setEmail } = useAuth();
  setToken("");
  setUID("");
  setName("");
  setRole("");
  setEmail("");
  isLoading.value = false;
  window.location.href = "http://localhost:3000";
});

onLogoutError((error) => {
  console.log("Log out Error: " + error);
});

const userRole = ref("");

watchEffect(() => {
  userRole.value = role.value;
});

const handleLogout = async () => {
  const { uid } = useAuth();
  isLoading.value = true;
  logOut({ uid });
};
</script>

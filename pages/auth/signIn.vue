<template>
  <div class="flex flex-col justify-center items-center min-h-screen">
    <h-notification
      @close="messageShow = false"
      :success="messageStatus"
      v-model="messageShow"
      >{{ messageContent }}
    </h-notification>
    <!-- <header class="w-full max-w-[27rem] px-2 mx-auto">
      <Logo class="scale-[0.71] mx-auto" />
    </header> -->
    <form class="w-full max-w-[27rem] p-5" @submit.prevent="handleLogin">
      <h1 class="text-3xl font-bold mb-3 text-neutral100">Welcome Back</h1>
      <h1 class="text-sm text-neutral200 mb-5">Sign In to continue</h1>
      <div>
        <HTextField
          name="Email"
          placeholder="Email Address"
          rules="required|email"
        >
        </HTextField>

        <HTextField
          name="Password"
          type="password"
          placeholder="Password"
          rules="required|password"
          trailing-icon="mdi:eye-outline"
        >
        </HTextField>
      </div>

      <div class="flex items-center justify-between">
        <NuxtLink
          to="/auth/forgetPassword"
          class="inline-block ml-auto align-baseline font-semibold text-sm text-primary hover:text-primaryvar1"
        >
          Forgot Password?
        </NuxtLink>
      </div>

      <br />
      <HButton
        btn-name-class="font-bold"
        type="submit"
        :is-loading="loading"
        btn-name="Login"
        rounded-class="rounded-md"
      />

      <div class="max-w-[27rem] w-full flex gap-2 items-center my-4 mx-auto">
        <span class="flex-1 h-[1px] bg-black/10"></span>
        <p class="text-black/40 text-sm">Login with social accounts</p>
        <span class="flex-1 h-[1px] bg-black/10"></span>
      </div>

      <div class="flex justify-center space-x-4">
        <button
          type="button"
          @click="handleSignInWithGoogle"
          aria-label="Log in with Google"
          class="p-1 rounded-sm text-[#4285F4]/90 hover:text-[#4285F4] transition-colors duration-300 ease-in-out"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            class="w-5 h-5 fill-current"
          >
            <path
              d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"
            ></path>
          </svg>
        </button>
      </div>

      <p class="text-sm w-full text-center mt-3">
        Don't have an account yet?
        <NuxtLink
          to="/auth/signUp"
          class="font-bold text-primary hover:text-primaryvar1"
          >Sign up</NuxtLink
        >
      </p>
    </form>
  </div>
</template>

<script setup lang="ts">
import jwtDecode from "jwt-decode";
import userLogin from "@/apollo/mutation/userLogin.gql";
import { useAuth } from "~~/store/auth";
import { useForm } from "vee-validate";

const loading = ref<boolean>(false);
const messageStatus = ref(false);
const messageShow = ref(false);
const messageContent = ref("");

const {
  onDone: onLoginResult,
  onError: onLoginError,
  mutate: logIn,
} = useCustomMutation(userLogin);

const { handleSubmit, resetForm } = useForm();

onLoginResult(async (result: any) => {
  const { signUserOut } = useFirebaseClient();
  await signUserOut();
  loading.value = false;
  const { accessToken, uid } = result.data.userLogin;
  const { toSignInPageFrom } = useAuth();
  const router = useRouter();
  await decodeAndStoreJwtToken(accessToken);
  resetForm();
  const { role } = useAuth();
  console.log({ role });
  if (role === "super_admin") window.location.href = "http://localhost:3002";
  else if (toSignInPageFrom.startsWith("/auth")) router.push("/");
  else router.back();
});

onLoginError((error) => {
  loading.value = false;

  if (error.graphQLErrors && error.graphQLErrors[0]?.extensions?.internal) {
    const { response } = error.graphQLErrors[0].extensions.internal as {
      response: { status: number };
    };

    showNotification(
      false,
      response.status === 403
        ? "Email Not Verified"
        : useErrorParser(error + "")
    );
    return;
  }
  showNotification(false, useErrorParser(error + ""));
});

const handleLogin = handleSubmit(async (value) => {
  loading.value = true;
  const { Email: email, Password: password } = value;
  const { signInUser } = useFirebaseClient();
  const { idToken, error } = await signInUser(email, password);
  if (error) {
    loading.value = false;
    showNotification(false, useErrorParser(error + ""));
  }
  if (idToken) {
    logIn({ idToken });
  }
});

const handleSignInWithGoogle = async () => {
  const { signInUserWithGoogle } = useFirebaseClient();
  const { idToken, error } = await signInUserWithGoogle();

  if (error) {
    showNotification(false, useErrorParser(error));
  }
  if (idToken) {
    logIn({ idToken });
  }
};

const showNotification = (status: boolean, message: string) => {
  messageShow.value = true;
  messageStatus.value = status;
  messageContent.value = message;
};

const decodeAndStoreJwtToken = async (token: string) => {
  const { name, email, metadata, manager_id } = (await jwtDecode(token)) as {
    name: string;
    email: string;
    manager_id: string;
    metadata: { roles: Array<string>; user_id: string };
  };

  const { roles, user_id } = metadata;

  const { setToken, setUID, setName, setRole, setEmail, setManagerID } =
    useAuth();
  setToken(token);
  setUID(user_id);
  setName(name);
  setRole(roles[0]);
  setEmail(email);
  setManagerID(manager_id);
};

definePageMeta({
  middleware: "before-sign-in",
});
</script>

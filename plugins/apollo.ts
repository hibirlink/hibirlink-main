import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client/core";
import { ApolloClients } from "@vue/apollo-composable";
import { useAuth } from "~~/store/auth";
import { storeToRefs } from "pinia";
import { setContext } from "@apollo/client/link/context";
import jwtDecode from "jwt-decode";

const withToken = setContext(async (_, { headers }) => {
  const store = useAuth();
  const { token, uid } = storeToRefs(store);

  if (token.value) {
    const { exp } = jwtDecode(token.value) as {
      name: string;
      metadata: { roles: Array<string>; user_id: string };
      exp: number;
      iat: number;
    };

    // token Expired
    if (Date.now() >= exp * 1000 && process.client) {
      const config = useRuntimeConfig().public;
      await $fetch(config.restEndpoint + "/auth/refresh", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          uid: uid.value,
        }),
      })
        .then((value) => {
          const { accessToken } = value as { accessToken: string };

          store.setToken(accessToken);
        })
        .catch((err) => {
          // refresh token expires
          if (err.statusCode === 440) {
            store.setToken("");
            store.setUID("");
            const router = useRouter();
            router.push("/auth/rul");
          }
        });
    }
  }

  if (token.value)
    return {
      headers: {
        authorization: token ? `Bearer ${token.value}` : "",
      },
    };
});

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig().public;
  const httpLink = createHttpLink({
    uri: config.graphqlEndpoint,
  });

  const apolloClient = new ApolloClient({
    link: withToken.concat(httpLink),
    cache: new InMemoryCache(),
  });

  nuxtApp.vueApp.provide(ApolloClients, { default: apolloClient });
});

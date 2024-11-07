import { useAuth } from "~~/store/auth";

export default defineNuxtRouteMiddleware((to, from) => {
  const { uid } = useAuth();
  if (uid) return true;
  else return abortNavigation();
});

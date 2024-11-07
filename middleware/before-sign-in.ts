import { useAuth } from "~~/store/auth";

export default defineNuxtRouteMiddleware((to, from) => {
  const { setToSignInPageFrom } = useAuth();
  setToSignInPageFrom(from.path);
  return true;
});

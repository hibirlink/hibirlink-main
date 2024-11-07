import { useAuth } from "@/store/auth";
import { storeToRefs } from "pinia";
export default defineNuxtRouteMiddleware((to, from) => {
  const store = useAuth();
  const { token, role } = storeToRefs(store);
  if (token.value && role.value === "customer") return true;
  else return navigateTo("/");
});

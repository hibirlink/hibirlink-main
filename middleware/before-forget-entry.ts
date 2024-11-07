export default defineNuxtRouteMiddleware((to, from) => {
  if (from.path.toLowerCase() !== "/auth/signin") return false;
  return true;
});

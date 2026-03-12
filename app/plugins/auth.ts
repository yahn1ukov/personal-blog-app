export default defineNuxtPlugin(async () => {
  if (import.meta.server) {
    await useAuthStore().getCurrentUser();
  }
});

export default defineNuxtPlugin(async () => {
  const store = useAuthStore();
  const { getCurrentUser } = store;

  if (import.meta.server) {
    await getCurrentUser();
  }
});

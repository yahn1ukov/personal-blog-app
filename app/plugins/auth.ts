export default defineNuxtPlugin(async () => {
  const store = useAuthStore();

  const { isAuthPluginInitialized } = storeToRefs(store);
  const { getCurrentUser } = store;

  if (!isAuthPluginInitialized.value) {
    await getCurrentUser();
  }
});

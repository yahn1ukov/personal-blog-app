import { PINIA_STORE_KEY } from "@/utils/constants/pinia.constant";
import { withRequestState, type RequestState } from "@/utils/http/request-state";
import type { UpdatePasswordRequestDto } from "~~/shared/dto/user.dto";

export const useUserStore = defineStore(PINIA_STORE_KEY.USER, () => {
  const authStore = useAuthStore();

  const state = reactive<RequestState>({
    isLoading: false,
    error: null,
  });

  async function update(formData: FormData) {
    const result = await withRequestState(state, () => $fetch("/api/users", { method: "PATCH", body: formData }));
    if (result.ok) {
      await authStore.getCurrentUser();
    }

    return result;
  }

  async function updatePassword(dto: UpdatePasswordRequestDto) {
    const result = await withRequestState(state, () => $fetch("/api/users/password", { method: "PATCH", body: dto }));
    if (result.ok) {
      await authStore.logout();
    }

    return result;
  }

  async function remove() {
    const result = await withRequestState(state, () => $fetch("/api/users", { method: "DELETE" }));
    if (result.ok) {
      await authStore.logout();
    }

    return result;
  }

  function clearError() {
    state.error = null;
  }

  return {
    state,
    update,
    updatePassword,
    remove,
    clearError,
  };
});

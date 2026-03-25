import { PINIA_STORE_KEY } from "@/utils/constants/pinia.constant";
import { withRequestState, type RequestState } from "@/utils/http/request-state";
import type {
  DeleteUserResponseDto,
  UpdatePasswordRequestDto,
  UpdatePasswordResponseDto,
  UpdateUserResponseDto,
} from "~~/shared/dto";

export const useUserStore = defineStore(PINIA_STORE_KEY.USER, () => {
  const authStore = useAuthStore();

  const state = ref<RequestState>({
    isLoading: false,
    error: null,
  });

  async function update(formData: FormData) {
    const result = await withRequestState(state, () =>
      $fetch<UpdateUserResponseDto>("/api/users", { method: "PATCH", body: formData }),
    );
    if (result.ok) {
      await authStore.getCurrentUser();
    }

    return result;
  }

  async function updatePassword(dto: UpdatePasswordRequestDto) {
    const result = await withRequestState(state, () =>
      $fetch<UpdatePasswordResponseDto>("/api/users/password", { method: "PATCH", body: dto }),
    );
    if (result.ok) {
      await authStore.logout();
    }

    return result;
  }

  async function remove() {
    const result = await withRequestState(state, () =>
      $fetch<DeleteUserResponseDto>("/api/users", { method: "DELETE" }),
    );
    if (result.ok) {
      await authStore.logout();
    }

    return result;
  }

  return {
    state,
    update,
    updatePassword,
    remove,
  };
});

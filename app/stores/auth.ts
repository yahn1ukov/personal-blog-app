import { PINIA_STORE_KEY } from "@/utils/constants/pinia.constant";
import { withRequestState, type RequestState } from "@/utils/http/request-state";
import type {
  GetAuthUserResponseDto,
  LoginRequestDto,
  LoginResponseDto,
  LogoutResponseDto,
  RegisterRequestDto,
  RegisterResponseDto,
} from "~~/shared/dto/auth.dto";

export const useAuthStore = defineStore(PINIA_STORE_KEY.AUTH, () => {
  const currentUser = ref<GetAuthUserResponseDto | null>(null);
  const state = reactive<RequestState>({
    isLoading: false,
    error: null,
  });

  async function getCurrentUser() {
    state.isLoading = true;
    state.error = null;

    try {
      const headers = import.meta.server ? (useRequestHeaders(["cookie"]) as HeadersInit) : undefined;

      const data = await $fetch<GetAuthUserResponseDto>("/api/auth/me", { headers });

      currentUser.value = data;
    } catch {
      currentUser.value = null;
    } finally {
      state.isLoading = false;
    }
  }

  async function login(dto: LoginRequestDto) {
    const result = await withRequestState(state, () =>
      $fetch<LoginResponseDto>("/api/auth/login", {
        method: "POST",
        body: dto,
      }),
    );
    if (result.ok) {
      await getCurrentUser();
    }

    return result;
  }

  async function register(dto: RegisterRequestDto) {
    const result = await withRequestState(state, () =>
      $fetch<RegisterResponseDto>("/api/auth/register", {
        method: "POST",
        body: dto,
      }),
    );
    if (result.ok) {
      await getCurrentUser();
    }

    return result;
  }

  async function logout() {
    const result = await withRequestState(state, () =>
      $fetch<LogoutResponseDto>("/api/auth/logout", {
        method: "POST",
      }),
    );
    if (result.ok) {
      currentUser.value = null;
    }

    return result;
  }

  return {
    state,
    currentUser,
    getCurrentUser,
    login,
    register,
    logout,
  };
});

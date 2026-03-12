import { withRequestState, type RequestState } from "@/utils/request-state";
import type { GetAuthUserResponseDto, LoginRequestDto, RegisterRequestDto } from "~~/shared/dto/auth.dto";

export const useAuthStore = defineStore(PINIA_STORE_KEY.AUTH, () => {
  const isAuthPluginInitialized = ref(false);
  const currentUser = ref<GetAuthUserResponseDto | null>(null);
  const state = reactive<RequestState>({
    isLoading: false,
    error: null,
  });

  async function getCurrentUser() {
    state.isLoading = true;
    state.error = null;

    try {
      if (import.meta.server) {
        const { jwtCookieName } = useRuntimeConfig();
        const token = useCookie(jwtCookieName);
        if (!token.value) {
          currentUser.value = null;
          return;
        }
      }

      const headers = import.meta.server ? ((useRequestHeaders(["cookie"]) as HeadersInit) ?? {}) : undefined;

      const data = await $fetch<GetAuthUserResponseDto>("/api/auth/me", {
        headers,
      });

      currentUser.value = data;
    } catch {
      currentUser.value = null;
    } finally {
      state.isLoading = false;
      isAuthPluginInitialized.value = true;
    }
  }

  async function login(dto: LoginRequestDto) {
    const result = await withRequestState(state, () => $fetch("/api/auth/login", { method: "POST", body: dto }));
    if (result.ok) {
      await getCurrentUser();
    }
  }

  async function register(dto: RegisterRequestDto) {
    const result = await withRequestState(state, () => $fetch("/api/auth/register", { method: "POST", body: dto }));
    if (result.ok) {
      await getCurrentUser();
    }
  }

  async function logout() {
    const result = await withRequestState(state, () => $fetch("/api/auth/logout", { method: "POST" }));
    if (result.ok) {
      currentUser.value = null;
    }
  }

  function clearError() {
    state.error = null;
  }

  return {
    state,
    isAuthPluginInitialized,
    currentUser,
    getCurrentUser,
    login,
    register,
    logout,
    clearError,
  };
});

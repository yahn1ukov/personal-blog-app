import { withRequestState, type RequestState } from "@/utils/request-state";
import type { GetAuthUserResponseDto, LoginRequestDto, RegisterRequestDto } from "~~/shared/dto/auth.dto";

export const useAuthStore = defineStore(PINIA_STORE_KEY.AUTH, () => {
  const isAuthPluginInitialized = ref(false);
  const currentUser = ref<GetAuthUserResponseDto | null>(null);
  const state = reactive<RequestState>({
    isLoading: false,
    error: null,
  });

  const isAuthenticated = computed(() => !!currentUser.value);

  async function getCurrentUser() {
    state.isLoading = true;
    state.error = null;

    try {
      if (import.meta.server) {
        const token = useCookie("Authorization");
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
    } catch (error: unknown) {
      console.error(error);
      currentUser.value = null;
    } finally {
      state.isLoading = false;
      isAuthPluginInitialized.value = true;
    }
  }

  async function login(dto: LoginRequestDto) {
    const data = await withRequestState(state, async () => {
      await $fetch("/api/auth/login", {
        method: "POST",
        body: dto,
      });

      return true;
    });

    if (data) {
      await getCurrentUser();
    }
  }

  async function register(dto: RegisterRequestDto) {
    const data = await withRequestState(state, async () => {
      await $fetch("/api/auth/register", {
        method: "POST",
        body: dto,
      });

      return true;
    });

    if (data) {
      await getCurrentUser();
    }
  }

  async function logout() {
    const data = await withRequestState(state, async () => {
      await $fetch("/api/auth/logout", { method: "POST" });

      return true;
    });

    if (data) {
      currentUser.value = null;
    }
  }

  return {
    state,
    isAuthPluginInitialized,
    isAuthenticated,
    currentUser,
    getCurrentUser,
    login,
    register,
    logout,
  };
});

<script setup lang="ts">
import type { AuthTabType } from "@/types/auth";
import type { LoginRequestDto, RegisterRequestDto } from "~~/shared/dto/auth.dto";

const isOpen = defineModel<boolean>({ required: true });

const store = useAuthStore();
const { state: authState, isAuthenticated } = storeToRefs(store);
const { login, register } = store;

const activeTab = ref<AuthTabType>(AUTH_TAB_TYPE.LOGIN);
const state = reactive<LoginRequestDto & RegisterRequestDto>({
  firstName: "",
  lastName: "",
  username: "",
  password: "",
});

const title = computed(() => (activeTab.value === AUTH_TAB_TYPE.LOGIN ? "Login" : "Register"));

function resetForm() {
  state.firstName = "";
  state.lastName = "";
  state.username = "";
  state.password = "";
}

watch(
  () => isOpen.value,
  (opened) => {
    if (!opened) {
      activeTab.value = AUTH_TAB_TYPE.LOGIN;
      resetForm();
    }
  },
);

watch(isAuthenticated, (value) => {
  if (value && isOpen.value) {
    isOpen.value = false;
  }
});

async function submit() {
  if (activeTab.value === AUTH_TAB_TYPE.LOGIN) {
    await login({
      username: state.username,
      password: state.password,
    });
    return;
  }

  await register(state);
}
</script>

<template>
  <AppModal v-model="isOpen" :title="title">
    <AppButtonGroup class="flex w-full">
      <AppButton
        type="button"
        class="flex-1"
        :class="activeTab === AUTH_TAB_TYPE.LOGIN ? 'bg-black text-white' : 'bg-white text-black'"
        @click="activeTab = AUTH_TAB_TYPE.LOGIN"
      >
        Login
      </AppButton>
      <AppButton
        type="button"
        class="flex-1"
        :class="activeTab === AUTH_TAB_TYPE.REGISTER ? 'bg-black text-white' : 'bg-white text-black'"
        @click="activeTab = AUTH_TAB_TYPE.REGISTER"
      >
        Register
      </AppButton>
    </AppButtonGroup>

    <form class="flex flex-col gap-3" @submit.prevent="submit">
      <template v-if="activeTab === AUTH_TAB_TYPE.REGISTER">
        <div class="flex flex-col gap-1">
          <label for="firstName" class="text-sm font-medium">First Name</label>
          <input
            id="firstName"
            v-model="state.firstName"
            type="text"
            class="rounded-md border border-black px-3 py-2 text-sm outline-none"
          />
        </div>

        <div class="flex flex-col gap-1">
          <div class="flex items-center justify-between">
            <label for="lastName" class="text-sm font-medium">Last Name</label>
            <span class="text-xs">(Optional)</span>
          </div>
          <input
            id="lastName"
            v-model="state.lastName"
            type="text"
            class="rounded-md border border-black px-3 py-2 text-sm outline-none"
          />
        </div>
      </template>

      <div class="flex flex-col gap-1">
        <label for="username" class="text-sm font-medium">Username</label>
        <input
          id="username"
          v-model="state.username"
          type="text"
          autocomplete="username"
          class="rounded-md border border-black px-3 py-2 text-sm outline-none"
        />
      </div>

      <div class="flex flex-col gap-1">
        <label for="password" class="text-sm font-medium">Password</label>
        <input
          id="password"
          v-model="state.password"
          type="password"
          autocomplete="current-password"
          class="rounded-md border border-black px-3 py-2 text-sm outline-none"
        />
      </div>

      <AppButton type="submit" :loading="authState.isLoading" class="self-start">
        {{ activeTab === AUTH_TAB_TYPE.LOGIN ? "Login" : "Register" }}
      </AppButton>
    </form>
  </AppModal>
</template>

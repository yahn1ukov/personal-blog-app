<script setup lang="ts">
import type { AuthTabType } from "@/utils/types";
import type { LoginRequestDto, RegisterRequestDto } from "~~/shared/dto/auth.dto";

const isOpen = defineModel<boolean>({ required: true });

const store = useAuthStore();
const { state, currentUser } = storeToRefs(store);
const { login, register, clearError } = store;

const activeTab = ref<AuthTabType>(AUTH_TAB_TYPE.LOGIN);

const formState = reactive<LoginRequestDto & RegisterRequestDto>({
  firstName: "",
  lastName: "",
  username: "",
  password: "",
});

const title = computed(() => (activeTab.value === AUTH_TAB_TYPE.LOGIN ? "Login" : "Register"));

function handleTabChange(tab: AuthTabType) {
  activeTab.value = tab;
  clearError();
}

function resetForm() {
  formState.firstName = "";
  formState.lastName = "";
  formState.username = "";
  formState.password = "";
}

watch(isOpen, (opened) => {
  if (!opened) {
    activeTab.value = AUTH_TAB_TYPE.LOGIN;
    clearError();
    resetForm();
  }
});

watch(currentUser, (user) => {
  if (user && isOpen.value) {
    isOpen.value = false;
  }
});

async function submit() {
  if (activeTab.value === AUTH_TAB_TYPE.LOGIN) {
    await login({
      username: formState.username,
      password: formState.password,
    });
    return;
  }

  await register(formState);
}
</script>

<template>
  <AppModal v-model="isOpen" :title="title">
    <AppButtonGroup class="w-full">
      <AppButton
        type="button"
        class="flex-1"
        :class="activeTab === AUTH_TAB_TYPE.LOGIN ? 'bg-black text-white' : 'bg-white text-black'"
        @click="handleTabChange(AUTH_TAB_TYPE.LOGIN)"
      >
        Login
      </AppButton>
      <AppButton
        type="button"
        class="flex-1"
        :class="activeTab === AUTH_TAB_TYPE.REGISTER ? 'bg-black text-white' : 'bg-white text-black'"
        @click="handleTabChange(AUTH_TAB_TYPE.REGISTER)"
      >
        Register
      </AppButton>
    </AppButtonGroup>

    <AppMessage v-if="state.error" :message="state.error.message" :type="MESSAGE_TYPE.ERROR" />

    <form class="flex flex-col gap-3" @submit.prevent="submit">
      <template v-if="activeTab === AUTH_TAB_TYPE.REGISTER">
        <div class="flex flex-col gap-1">
          <label for="firstName" class="text-sm font-medium">First Name</label>
          <input
            id="firstName"
            v-model="formState.firstName"
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
            v-model="formState.lastName"
            type="text"
            class="rounded-md border border-black px-3 py-2 text-sm outline-none"
          />
        </div>
      </template>

      <div class="flex flex-col gap-1">
        <label for="username" class="text-sm font-medium">Username</label>
        <input
          id="username"
          v-model="formState.username"
          type="text"
          class="rounded-md border border-black px-3 py-2 text-sm outline-none"
        />
      </div>

      <div class="flex flex-col gap-1">
        <label for="password" class="text-sm font-medium">Password</label>
        <input
          id="password"
          v-model="formState.password"
          type="password"
          class="rounded-md border border-black px-3 py-2 text-sm outline-none"
        />
      </div>

      <AppButton type="submit" :loading="state.isLoading" class="self-start">
        {{ activeTab === AUTH_TAB_TYPE.LOGIN ? "Login" : "Register" }}
      </AppButton>
    </form>
  </AppModal>
</template>

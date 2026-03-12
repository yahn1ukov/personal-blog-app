<script setup lang="ts">
import { AUTH_TAB_TYPE } from "@/utils/constants/auth.constant";
import { MESSAGE_TYPE } from "@/utils/constants/message.constant";
import type { AuthTabType } from "@/utils/types/auth.type";
import type { Tab } from "@/utils/types/tab.type";
import type { LoginRequestDto, RegisterRequestDto } from "~~/shared/dto/auth.dto";

const isOpen = defineModel<boolean>({ required: true });

const store = useAuthStore();
const { state, currentUser } = storeToRefs(store);
const { login, register, clearError } = store;

const tabs: Tab[] = [
  { label: "Login", value: AUTH_TAB_TYPE.LOGIN },
  { label: "Register", value: AUTH_TAB_TYPE.REGISTER },
];

const activeTab = ref<AuthTabType>(AUTH_TAB_TYPE.LOGIN);
const formState = reactive<LoginRequestDto & RegisterRequestDto>({
  firstName: "",
  lastName: "",
  username: "",
  password: "",
});

const title = computed(() => (activeTab.value === AUTH_TAB_TYPE.LOGIN ? "Login" : "Register"));

function resetForm() {
  Object.assign(formState, {
    firstName: "",
    lastName: "",
    username: "",
    password: "",
  });
}

watch(activeTab, () => clearError());

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
  <AppModal v-model="isOpen" v-model:activeTab="activeTab" :title="title" :tabs="tabs">
    <AppMessage v-if="state.error" :message="state.error.message" :type="MESSAGE_TYPE.ERROR" />

    <form class="flex flex-col gap-3" @submit.prevent="submit">
      <template v-if="activeTab === AUTH_TAB_TYPE.REGISTER">
        <AppInput type="text" id="firstName" label="First Name" v-model="formState.firstName" />

        <AppInput
          type="text"
          id="lastName"
          label="Last Name"
          v-model="formState.lastName"
          show-hint
          hint="(Optional)"
        />
      </template>

      <AppInput type="text" id="username" label="Username" v-model="formState.username" />

      <AppInput type="password" id="password" label="Password" v-model="formState.password" />

      <AppButton type="submit" :loading="state.isLoading" class="self-start">
        {{ activeTab === AUTH_TAB_TYPE.LOGIN ? "Login" : "Register" }}
      </AppButton>
    </form>
  </AppModal>
</template>

<script setup lang="ts">
import { AUTH_TAB_TYPE } from "@/utils/constants/auth.constant";
import type { AuthTabType } from "@/utils/types/auth.type";
import type { Tab } from "@/utils/types/tab.type";
import type { LoginAndRegisterRequestDto } from "~~/shared/dto/auth.dto";

const isOpen = defineModel<boolean>({ required: true });

const store = useAuthStore();
const { state, currentUser } = storeToRefs(store);
const { login, register, clearError } = store;

const tabs: Tab[] = [
  { label: "Login", value: AUTH_TAB_TYPE.LOGIN },
  { label: "Register", value: AUTH_TAB_TYPE.REGISTER },
];

const activeTab = ref<AuthTabType>(AUTH_TAB_TYPE.LOGIN);
const formState = reactive<LoginAndRegisterRequestDto>({
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

  clearError();
}

watch(activeTab, clearError);

watch(isOpen, (opened) => {
  if (!opened) {
    activeTab.value = AUTH_TAB_TYPE.LOGIN;
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
  } else {
    await register(formState);
  }
}
</script>

<template>
  <AppModal :title :tabs v-model="isOpen" v-model:activeTab="activeTab">
    <AppForm :state :submit-label="activeTab === AUTH_TAB_TYPE.LOGIN ? 'Login' : 'Register'" @submit="submit">
      <template v-if="activeTab === AUTH_TAB_TYPE.REGISTER">
        <AppInput type="text" id="firstName" label="First Name" v-model="formState.firstName" />

        <AppInput type="text" id="lastName" label="Last Name" v-model="formState.lastName" hint="(Optional)" />
      </template>

      <AppInput type="text" id="username" label="Username" v-model="formState.username" />

      <AppInput type="password" id="password" label="Password" v-model="formState.password" />
    </AppForm>
  </AppModal>
</template>

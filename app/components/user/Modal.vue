<script setup lang="ts">
import { MESSAGE_TYPE } from "@/utils/constants/message.constant";
import { USER_TAB_TYPE } from "@/utils/constants/user.constant";
import type { Tab } from "@/utils/types/tab.type";
import type { UserTabType } from "@/utils/types/user.type";
import { FILE_TYPE } from "~~/shared/constants/file.constant";
import type { UpdatePasswordRequestDto, UpdateUserRequestDto } from "~~/shared/dto/user.dto";

const isOpen = defineModel<boolean>({ required: true });

const authStore = useAuthStore();
const { currentUser } = storeToRefs(authStore);

const userStore = useUserStore();
const { state } = storeToRefs(userStore);
const { update, updatePassword, remove, clearError } = userStore;

const tabs: Tab[] = [
  { label: "User", value: USER_TAB_TYPE.USER },
  { label: "Password", value: USER_TAB_TYPE.PASSWORD },
];

const activeTab = ref<UserTabType>(USER_TAB_TYPE.USER);
const formState = reactive<
  Omit<UpdateUserRequestDto, "avatarImage"> & { avatarImage: File | null } & UpdatePasswordRequestDto
>({
  avatarImage: null,
  firstName: "",
  lastName: "",
  username: "",
  oldPassword: "",
  newPassword: "",
});

const title = computed(() => (activeTab.value === USER_TAB_TYPE.USER ? "User Settings" : "Change Password"));

watch(activeTab, () => clearError());

function resetForms() {
  Object.assign(formState, {
    avatarImage: null,
    firstName: currentUser.value?.firstName ?? "",
    lastName: currentUser.value?.lastName ?? "",
    username: currentUser.value?.username ?? "",
    oldPassword: "",
    newPassword: "",
  });

  clearError();
}

watch(isOpen, (opened) => {
  if (opened) {
    activeTab.value = USER_TAB_TYPE.USER;
    resetForms();
  }
});

async function submitUpdate() {
  const formData = new FormData();

  formData.append("lastName", formState.lastName ?? "");

  if (formState.firstName) {
    formData.append("firstName", formState.firstName);
  }
  if (formState.username) {
    formData.append("username", formState.username);
  }
  if (formState.avatarImage) {
    formData.append("image", formState.avatarImage);
  }

  const result = await update(formData);
  if (result.ok) {
    isOpen.value = false;
  }
}

async function submitUpdatePassword() {
  const result = await updatePassword({ oldPassword: formState.oldPassword, newPassword: formState.newPassword });
  if (result.ok) {
    isOpen.value = false;
  }
}

async function handleRemove() {
  await remove();
  isOpen.value = false;
}
</script>

<template>
  <AppModal v-model="isOpen" v-model:activeTab="activeTab" :title="title" :tabs="tabs">
    <template v-if="activeTab === USER_TAB_TYPE.USER">
      <AppMessage v-if="state.error" :message="state.error.message" :type="MESSAGE_TYPE.ERROR" />

      <form class="flex flex-col gap-3" @submit.prevent="submitUpdate">
        <AppFileUpload
          id="avatarImage"
          label="Avatar"
          :file-type="FILE_TYPE.AVATAR"
          :current-image="currentUser?.avatarImageURL ?? undefined"
          v-model="formState.avatarImage"
        />

        <AppInput type="text" id="firstName" label="First Name" v-model="formState.firstName" />

        <AppInput type="text" id="lastName" label="Last Name" v-model="formState.lastName" />

        <AppInput type="text" id="username" label="Username" v-model="formState.username" />

        <div class="flex items-center justify-between">
          <AppButton type="submit" :loading="state.isLoading">Save</AppButton>
          <AppButton
            type="button"
            class="border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
            @click="handleRemove"
          >
            Delete Account
          </AppButton>
        </div>
      </form>
    </template>

    <template v-else>
      <AppMessage v-if="state.error" :message="state.error.message" :type="MESSAGE_TYPE.ERROR" />

      <form class="flex flex-col gap-3" @submit.prevent="submitUpdatePassword">
        <AppInput type="password" id="oldPassword" label="Old Password" v-model="formState.oldPassword" />

        <AppInput type="password" id="newPassword" label="New Password" v-model="formState.newPassword" />

        <AppButton type="submit" :loading="state.isLoading" class="self-start">Change Password</AppButton>
      </form>
    </template>
  </AppModal>
</template>

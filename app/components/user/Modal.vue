<script setup lang="ts">
import { USER_TAB_TYPE } from "@/utils/constants/user.constant";
import type { Result } from "@/utils/http/request-state";
import type { Tab } from "@/utils/types/tab.type";
import type { UserTabType } from "@/utils/types/user.type";
import { FILE_TYPE } from "~~/shared/constants/file.constant";
import type { UpdateUserAndPasswordRequestDto } from "~~/shared/dto/user.dto";

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
const formState = reactive<UpdateUserAndPasswordRequestDto>({
  avatarImage: null,
  firstName: "",
  lastName: "",
  username: "",
  oldPassword: "",
  newPassword: "",
});

const title = computed(() => (activeTab.value === USER_TAB_TYPE.USER ? "User Settings" : "Change Password"));

watch(activeTab, clearError);

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

async function submit() {
  let result: Result<unknown>;

  if (activeTab.value === USER_TAB_TYPE.USER) {
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

    result = await update(formData);
  } else {
    result = await updatePassword({ oldPassword: formState.oldPassword, newPassword: formState.newPassword });
  }

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
  <AppModal :title :tabs v-model="isOpen" v-model:activeTab="activeTab">
    <template v-if="activeTab === USER_TAB_TYPE.USER">
      <AppForm :state submit-label="Save" @submit="submit">
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

        <template #actions>
          <AppButton type="submit" :loading="state.isLoading">Save</AppButton>
          <AppButton
            type="button"
            class="border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
            @click="handleRemove"
          >
            Delete Account
          </AppButton>
        </template>
      </AppForm>
    </template>

    <template v-else>
      <AppForm :state submit-label="Change Password" @submit="submit">
        <AppInput type="password" id="oldPassword" label="Old Password" v-model="formState.oldPassword" />

        <AppInput type="password" id="newPassword" label="New Password" v-model="formState.newPassword" />
      </AppForm>
    </template>
  </AppModal>
</template>

<script setup lang="ts">
const isAuthModalOpen = ref(false);
const isSettingsModalOpen = ref(false);

const store = useAuthStore();
const { currentUser } = storeToRefs(store);
const { logout } = store;
</script>

<template>
  <nav class="flex items-center justify-end w-full h-9">
    <div v-if="currentUser" class="inline-flex gap-4">
      <AppUser :user="currentUser" :styles="{ avatar: 'size-9', username: 'font-medium' }" />

      <AppButtonGroup>
        <AppButton type="button" icon="lucide:settings" @click="isSettingsModalOpen = true" />
        <AppButton type="button" icon="lucide:log-out" @click="logout" />
      </AppButtonGroup>
    </div>

    <AppButton v-else type="button" @click="isAuthModalOpen = true">Authentication</AppButton>

    <AuthModal v-model="isAuthModalOpen" />
    <UserModal v-model="isSettingsModalOpen" />
  </nav>
</template>

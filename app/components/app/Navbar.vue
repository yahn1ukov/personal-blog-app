<script setup lang="ts">
const isAuthModalOpen = ref(false);

const store = useAuthStore();
const { currentUser, isAuthenticated } = storeToRefs(store);
const { logout } = store;
</script>

<template>
  <nav class="flex justify-end">
    <div v-if="isAuthenticated" class="inline-flex gap-4">
      <AppUser v-if="currentUser" :user="currentUser" :style="{ avatar: 'size-9', username: 'font-medium' }" />

      <AppButtonGroup>
        <AppButton type="button" icon="lucide:settings" />
        <AppButton type="button" icon="lucide:log-out" @click="logout" />
      </AppButtonGroup>
    </div>

    <AppButton v-else type="button" @click="isAuthModalOpen = true">Authentication</AppButton>

    <AuthModal v-model="isAuthModalOpen" />
  </nav>
</template>

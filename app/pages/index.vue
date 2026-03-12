<script setup lang="ts">
const store = usePostStore();
const { posts, state } = storeToRefs(store);

await useAsyncData("posts-index", () => store.getAll({}));
</script>

<template>
  <AppMessage v-if="state.isLoading" message="Loading..." />

  <AppMessage v-else-if="state.error" :message="state.error.message" :type="MESSAGE_TYPE.ERROR" />

  <PostList v-else :posts />
</template>

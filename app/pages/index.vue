<script setup lang="ts">
const store = usePostStore();
const { posts, state } = storeToRefs(store);

await useAsyncData("posts-index", async () => {
  await store.getAll({});
  return true;
});
</script>

<template>
  <p v-if="state.isLoading" class="text-sm text-black/60">Loading...</p>

  <PostList v-else :posts />
</template>

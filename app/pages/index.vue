<script setup lang="ts">
import { MESSAGE_TYPE } from "@/utils/constants/message.constant";

const postStore = usePostStore();
const { posts, totalPages, state, query } = storeToRefs(postStore);

const categoryStore = useCategoryStore();

const currentPage = ref(1);
const selectedCategories = ref<string[]>([]);

async function onPageChange(page: number) {
  currentPage.value = page;
  query.value = { ...query.value, page };
  await postStore.getAll();
}

watch(selectedCategories, async (slugs) => {
  currentPage.value = 1;
  query.value = slugs.length ? { categories: slugs } : {};
  await postStore.getAll();
});

watch(posts, async (newPosts) => {
  if (newPosts.length === 0 && currentPage.value > 1) {
    await onPageChange(currentPage.value - 1);
  }
});

await useAsyncData("posts-index", () => postStore.getAll());
await useAsyncData("categories-index", () => categoryStore.getAll());
</script>

<template>
  <div class="flex flex-col flex-1">
    <AppToolbar v-model="selectedCategories" class="mb-3" />

    <AppMessage v-if="state.isLoading" message="Loading..." />

    <AppMessage v-else-if="state.error" :message="state.error.message" :type="MESSAGE_TYPE.ERROR" />

    <template v-else>
      <PostList v-if="posts.length" :posts />
      <AppMessage v-else message="No Posts" />

      <div class="flex justify-center mt-auto pt-6">
        <AppPagination :model-value="currentPage" :total-pages="totalPages" @update:model-value="onPageChange" />
      </div>
    </template>
  </div>
</template>

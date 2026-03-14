<script setup lang="ts">
const categoryStore = useCategoryStore();
const { categories } = storeToRefs(categoryStore);

const authStore = useAuthStore();
const { currentUser } = storeToRefs(authStore);

const selectedCategories = defineModel<string[]>({ required: true });

const isPostModalOpen = ref(false);

const categoryOptions = computed(() =>
  categories.value.map((category) => ({
    label: category.name,
    value: category.slug,
  })),
);
</script>

<template>
  <div class="flex items-center justify-between gap-3">
    <AppButton v-if="currentUser" type="button" icon="lucide:plus" @click="isPostModalOpen = true">
      Add Post
    </AppButton>

    <AppSelect :options="categoryOptions" placeholder="All categories" multiple v-model="selectedCategories" />

    <PostModal v-model="isPostModalOpen" />
  </div>
</template>

<script setup lang="ts">
import { MESSAGE_TYPE } from "@/utils/constants/message.constant";

const route = useRoute();

const store = usePostStore();
const { post, state } = storeToRefs(store);

await useAsyncData(
  () => `post-${route.params.slug}`,
  () => store.getByIdOrSlug(route.params.slug as string),
  { watch: [() => route.params.slug] },
);

const formattedCreatedAt = useDateFormat(
  computed(() => post.value?.createdAt),
  "DD.MM.YYYY HH:mm",
);
</script>

<template>
  <AppMessage v-if="state.isLoading" message="Loading..." />

  <AppMessage v-else-if="state.error" :message="state.error.message" :type="MESSAGE_TYPE.ERROR" />

  <div v-else-if="post" class="flex flex-col gap-6">
    <AppBanner v-if="post.coverImageURL" :src="post.coverImageURL" :alt="post.slug" class="h-52 rounded-md" />

    <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold">{{ post.title }}</h1>

    <AppUser
      :user="post.author"
      :styles="{ avatar: 'size-12', fullName: 'text-lg', username: 'text-black/50' }"
      show-full-name
    />

    <span class="text-black/50 whitespace-nowrap">{{ formattedCreatedAt }}</span>

    <div class="flex flex-wrap gap-1.5">
      <AppChip v-for="category in post.categories" :key="category.slug" :label="category.name" />
    </div>

    <p class="sm:text-lg text-justify leading-relaxed">
      {{ post.content }}
    </p>
  </div>
</template>

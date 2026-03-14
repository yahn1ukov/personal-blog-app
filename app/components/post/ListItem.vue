<script setup lang="ts">
import type { PostDto } from "~~/shared/dto/post.dto";

interface Props {
  post: PostDto;
}

const props = defineProps<Props>();

const authStore = useAuthStore();
const { currentUser } = storeToRefs(authStore);

const postStore = usePostStore();
const { remove } = postStore;

const formattedCreatedAt = useTimeAgo(props.post.createdAt);
const isAuthor = computed(() => !!currentUser.value && currentUser.value.username === props.post.author.username);

const isEditModalOpen = ref(false);

async function handleDelete() {
  await remove(props.post.id);
}
</script>

<template>
  <li class="flex flex-col h-full border border-black rounded-md overflow-hidden transition-colors hover:bg-neutral-50">
    <NuxtLink :to="{ name: 'posts-slug', params: { slug: post.slug } }" class="flex flex-col flex-1">
      <AppBanner v-if="post.coverImageURL" :src="post.coverImageURL" :alt="post.slug" class="h-24" />

      <div class="p-2.5 flex flex-col flex-1 gap-3">
        <div class="flex items-center justify-between gap-2">
          <AppUser
            :user="post.author"
            :show-full-name="true"
            :styles="{ avatar: 'size-8', fullName: 'text-sm', username: 'text-xs text-black/50' }"
          />
          <span class="text-xs text-black/50 whitespace-nowrap">{{ formattedCreatedAt }}</span>
        </div>

        <div class="flex flex-wrap gap-1.5">
          <AppChip v-for="category in post.categories" :key="category.slug" :label="category.name" />
        </div>

        <h3 class="text-lg font-bold line-clamp-1 tracking-tight">
          {{ post.title }}
        </h3>

        <span class="text-sm text-black/60 line-clamp-2 leading-relaxed">
          {{ post.content }}
        </span>
      </div>
    </NuxtLink>

    <div class="px-2.5 pb-2.5">
      <AppButtonGroup v-if="isAuthor" class="w-full">
        <AppButton type="button" icon="lucide:pencil" class="flex-1" @click="isEditModalOpen = true"> Edit </AppButton>
        <AppButton
          type="button"
          icon="lucide:trash-2"
          class="flex-1 border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
          @click="handleDelete"
        >
          Delete
        </AppButton>
      </AppButtonGroup>
    </div>

    <PostModal :post v-model="isEditModalOpen" />
  </li>
</template>

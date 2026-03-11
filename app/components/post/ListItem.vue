<script setup lang="ts">
import type { PostDto } from "~~/shared/dto/post.dto";

interface Props {
  post: PostDto;
}

const props = defineProps<Props>();

const formattedCreatedAt = useTimeAgo(props.post.createdAt);
</script>

<template>
  <li class="flex h-full">
    <NuxtLink
      :to="{ name: 'posts-slug', params: { slug: post.slug } }"
      class="flex flex-col w-full border border-black rounded-md overflow-hidden cursor-pointer transition-all duration-300 ease-in-out hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[2px_2px_0px_0px_black] hover:bg-neutral-50 hover:brightness-[0.97]"
    >
      <AppBanner v-if="post.coverImageURL" :src="post.coverImageURL" :alt="post.slug" class="h-24" />

      <div class="p-2.5 flex flex-col gap-3">
        <div class="flex items-center justify-between gap-2">
          <AppUser
            :user="post.author"
            :show-full-name="true"
            :style="{ avatar: 'size-8', fullName: 'text-sm', username: 'text-xs text-black/50' }"
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
  </li>
</template>

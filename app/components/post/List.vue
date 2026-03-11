<script setup lang="ts">
import type { GetPostsResponseDto } from "~~/shared/dto/post.dto";

interface Props {
  posts: GetPostsResponseDto;
}

defineProps<Props>();
</script>

<template>
  <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    <PostListItem v-for="post in posts" :key="post.id" :post />
  </ul>
</template>

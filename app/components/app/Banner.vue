<script setup lang="ts">
interface Props {
  src: string;
  alt: string;
}

defineProps<Props>();
</script>

<template>
  <img :src :alt class="w-full object-cover" />
</template>

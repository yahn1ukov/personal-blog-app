<script setup lang="ts">
interface Props {
  label: string;
}

defineProps<Props>();
</script>

<template>
  <span class="px-1.5 py-0.5 text-xs border border-black rounded-full truncate">
    {{ label }}
  </span>
</template>

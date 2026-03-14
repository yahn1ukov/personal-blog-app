<script setup lang="ts">
interface Props {
  icon?: string;
  label: string;
}

defineProps<Props>();
</script>

<template>
  <span
    class="px-1.5 py-0.5 inline-flex items-center gap-1 text-xs border border-black rounded-full truncate cursor-pointer"
  >
    <Icon v-if="icon" :name="icon" class="shrink-0 size-3" />

    {{ label }}
  </span>
</template>

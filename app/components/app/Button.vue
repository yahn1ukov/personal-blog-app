<script setup lang="ts">
interface Props {
  type: "button" | "submit";
  icon?: string;
  disabled?: boolean;
  loading?: boolean;
}

defineProps<Props>();
const slots = useSlots();

const hasText = computed(() => !!slots.default);
</script>

<template>
  <button
    :type
    class="rounded-md inline-flex items-center justify-center gap-1.5 text-sm font-medium border border-black transition-colors hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-transparent disabled:hover:text-black"
    :class="hasText ? 'px-2.5 py-1.5' : 'p-1.5'"
    :disabled="loading || disabled"
  >
    <Icon v-if="loading" name="lucide:loader" class="shrink-0 size-5 animate-spin" />

    <Icon v-else-if="icon" :name="icon" class="shrink-0 size-5" />

    <span v-if="hasText" class="truncate">
      <slot />
    </span>
  </button>
</template>

<script setup lang="ts">
interface Props {
  totalPages: number;
}

const props = defineProps<Props>();
const currentPage = defineModel<number>({ required: true });

const pages = computed(() => {
  const total = props.totalPages;
  const current = currentPage.value;

  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1) as (number | "...")[];
  }

  const items: (number | "...")[] = [1];

  if (current > 3) {
    items.push("...");
  }

  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);

  for (let i = start; i <= end; i++) {
    items.push(i);
  }

  if (current < total - 2) {
    items.push("...");
  }

  items.push(total);

  return items;
});

function pageClass(page: number) {
  return currentPage.value === page ? "bg-black text-white hover:bg-black" : "";
}
</script>

<template>
  <div v-if="totalPages > 1" class="flex items-center gap-1">
    <template v-for="(page, i) in pages" :key="i">
      <span v-if="page === '...'" class="px-1 text-sm select-none">...</span>

      <AppButton v-else type="button" :class="pageClass(page as number)" @click="currentPage = page">
        {{ page }}
      </AppButton>
    </template>
  </div>
</template>

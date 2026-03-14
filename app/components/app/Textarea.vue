<script setup lang="ts">
interface Props {
  id: string;
  label: string;
  placeholder?: string;
  hint?: string;
}

defineProps<Props>();
const model = defineModel<string>({ required: true });
</script>

<template>
  <div class="flex flex-col gap-1">
    <div v-if="hint" class="flex items-center justify-between">
      <label :for="id" class="text-sm font-medium">{{ label }}</label>
      <span class="text-xs">{{ hint }}</span>
    </div>

    <label v-else :for="id" class="text-sm font-medium">{{ label }}</label>

    <textarea
      :id
      :placeholder
      class="rounded-md border border-black px-3 py-2 text-sm outline-none resize-none"
      rows="4"
      v-model="model"
    />
  </div>
</template>

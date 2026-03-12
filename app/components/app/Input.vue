<script setup lang="ts">
interface Props {
  type: "text" | "password";
  id: string;
  label: string;
  placeholder?: string;
  showHint?: boolean;
  hint?: string;
}

defineProps<Props>();
const model = defineModel<string | undefined>({ required: true });
</script>

<template>
  <div class="flex flex-col gap-1">
    <div v-if="showHint" class="flex items-center justify-between">
      <label :for="id" class="text-sm font-medium">{{ label }}</label>
      <span class="text-xs">{{ hint }}</span>
    </div>

    <label v-else :for="id" class="text-sm font-medium">{{ label }}</label>

    <input
      :id
      v-model="model"
      :type="type"
      :placeholder
      class="rounded-md border border-black px-3 py-2 text-sm outline-none"
    />
  </div>
</template>

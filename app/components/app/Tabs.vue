<script setup lang="ts">
import type { Tab } from "@/utils/types/tab.type";

interface Props {
  tabs: Tab[];
}

defineProps<Props>();

const activeTab = defineModel<string>({ required: true });
</script>

<template>
  <AppButtonGroup class="w-full">
    <AppButton
      v-for="tab in tabs"
      :key="tab.value"
      type="button"
      class="flex-1"
      :class="activeTab === tab.value ? 'bg-black text-white' : 'bg-white text-black'"
      @click="activeTab = tab.value"
    >
      {{ tab.label }}
    </AppButton>
  </AppButtonGroup>
</template>

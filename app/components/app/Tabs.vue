<script setup lang="ts">
import type { Tab } from "@/utils/types/tab.type";

interface Props {
  tabs: Tab[];
}

defineProps<Props>();

const activeTab = defineModel<string>({ required: true });

function tabClass(tab: Tab) {
  return activeTab.value === tab.value ? "bg-black text-white" : "bg-white text-black";
}
</script>

<template>
  <AppButtonGroup>
    <AppButton
      v-for="tab in tabs"
      :key="tab.value"
      type="button"
      class="flex-1"
      :class="tabClass(tab)"
      @click="activeTab = tab.value"
    >
      {{ tab.label }}
    </AppButton>
  </AppButtonGroup>
</template>

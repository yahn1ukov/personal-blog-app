<script setup lang="ts">
interface Props {
  title?: string;
}

const props = defineProps<Props>();

const isOpen = defineModel<boolean>({ required: true });

const title = computed(() => props.title ?? "");
</script>

<template>
  <Teleport to="body">
    <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center">
      <button class="absolute inset-0 bg-black/60 cursor-auto" aria-label="Close modal" @click="isOpen = false" />

      <div
        class="relative z-10 flex w-full max-w-md flex-col gap-4 rounded-md bg-white p-4"
        role="dialog"
        aria-modal="true"
      >
        <div class="flex items-center justify-between gap-2">
          <h2 class="text-lg font-bold">{{ title }}</h2>

          <AppButton type="button" icon="lucide:x" aria-label="Close modal" @click="isOpen = false" />
        </div>

        <slot />
      </div>
    </div>
  </Teleport>
</template>

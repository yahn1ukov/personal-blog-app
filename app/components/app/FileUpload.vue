<script setup lang="ts">
import { FILE_TYPE } from "~~/shared/constants/file.constant";
import type { FileType } from "~~/shared/types/file.type";

interface Props {
  id: string;
  label: string;
  fileType: FileType;
  currentImage?: string;
}

const props = defineProps<Props>();
const model = defineModel<File | undefined | null>({ required: true });

const inputRef = ref<HTMLInputElement | null>(null);
const dropZoneRef = ref<HTMLDivElement | null>(null);

const previewUrl = useObjectUrl(model);
const displayImage = computed(() => previewUrl.value ?? props.currentImage);

const isAvatar = computed(() => props.fileType === FILE_TYPE.AVATAR);

function onDrop(files: File[] | null) {
  if (files?.length) {
    model.value = files[0];
  }
}

useDropZone(dropZoneRef, { onDrop });

function handleClick() {
  inputRef.value?.click();
}

function handleChange(event: Event) {
  model.value = (event.target as HTMLInputElement).files?.[0] ?? null;
}
</script>

<template>
  <div class="flex flex-col gap-1">
    <label :for="id" class="text-sm font-medium">{{ label }}</label>

    <div
      ref="dropZoneRef"
      :class="[
        'cursor-pointer overflow-hidden border border-black flex items-center justify-center',
        isAvatar ? 'h-24 w-24 rounded-full' : 'h-40 w-full rounded-md',
      ]"
      @click="handleClick"
    >
      <img v-if="displayImage" :src="displayImage" :alt="label" class="h-full w-full object-cover" />
      <Icon v-else name="lucide:image-up" class="text-black" size="32" />
    </div>

    <input ref="inputRef" :id type="file" accept="image/*" class="hidden" @change="handleChange" />
  </div>
</template>

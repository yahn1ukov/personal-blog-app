<script setup lang="ts">
import { MESSAGE_TYPE } from "@/utils/constants/message.constant";
import type { MessageType } from "@/utils/types/message.type";

interface Props {
  message: string;
  type?: MessageType;
}

const props = defineProps<Props>();

const styles = {
  [MESSAGE_TYPE.ERROR]: "text-red-600 border-red-300 bg-red-50",
  [MESSAGE_TYPE.SUCCESS]: "text-green-600 border-green-300 bg-green-50",
  [MESSAGE_TYPE.INFO]: "text-black/60 border-black/20 bg-black/5",
};

const classes = computed(() => styles[props.type ?? MESSAGE_TYPE.INFO]);
</script>

<template>
  <p class="px-3 py-2 rounded-md border text-sm" :class="classes">{{ message }}</p>
</template>

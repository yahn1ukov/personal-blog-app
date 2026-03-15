<script setup lang="ts">
import { MESSAGE_TYPE } from "@/utils/constants/message.constant";
import type { RequestState } from "@/utils/http/request-state";

interface Props {
  state: RequestState;
  submitLabel?: string;
}

interface Emits {
  (event: "submit"): void;
}

defineProps<Props>();
defineEmits<Emits>();
const slots = useSlots();

const hasActions = computed(() => !!slots.actions);
</script>

<template>
  <form class="flex flex-col gap-3" @submit.prevent="$emit('submit')">
    <AppMessage v-if="state.error" :message="state.error.message" :type="MESSAGE_TYPE.ERROR" />

    <slot />

    <slot v-if="hasActions" name="actions" />

    <AppButton v-else type="submit" :loading="state.isLoading">
      {{ submitLabel }}
    </AppButton>
  </form>
</template>

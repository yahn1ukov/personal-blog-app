<script setup lang="ts">
interface Option {
  label: string;
  value: string;
}

interface Props {
  id?: string;
  label?: string;
  options: Option[];
  placeholder?: string;
  multiple?: boolean;
  inputable?: boolean;
}

const props = defineProps<Props>();
const model = defineModel<string[]>({ required: true });

const isOpen = ref(false);
const inputValue = ref("");
const containerRef = ref<HTMLDivElement | null>(null);

onClickOutside(containerRef, () => {
  isOpen.value = false;
  updateInputDisplay();
});

const filteredOptions = computed(() => {
  if (!inputValue.value) return props.options;
  const lower = inputValue.value.toLowerCase();
  return props.options.filter((option) => option.label.toLowerCase().includes(lower));
});

function updateInputDisplay() {
  if (props.inputable) {
    inputValue.value = "";
  } else {
    const count = model.value.length;
    inputValue.value = count > 0 ? `${count} selected` : "";
  }
}

function isSelected(value: string) {
  return model.value.includes(value);
}

function toggle(value: string) {
  if (props.multiple) {
    const current = [...model.value];
    const idx = current.indexOf(value);
    if (idx === -1) current.push(value);
    else current.splice(idx, 1);
    model.value = current;
  } else {
    model.value = isSelected(value) ? [] : [value];
    isOpen.value = false;
    updateInputDisplay();
  }
}

function onFocus() {
  isOpen.value = true;
  inputValue.value = "";
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key === "Enter") {
    event.preventDefault();
    const trimmed = inputValue.value.trim();
    if (!trimmed) return;

    const exact = filteredOptions.value.find((o) => o.label.toLowerCase() === trimmed.toLowerCase());
    if (exact) {
      toggle(exact.value);
    } else if (props.inputable && !isSelected(trimmed)) {
      model.value = props.multiple ? [...model.value, trimmed] : [trimmed];
      if (!props.multiple) {
        isOpen.value = false;
        updateInputDisplay();
      }
    }

    inputValue.value = "";
  }
}
</script>

<template>
  <div ref="containerRef" class="relative flex flex-col gap-1">
    <label v-if="label" :for="id" class="text-sm font-medium">{{ label }}</label>

    <input
      :id
      type="text"
      :placeholder
      class="rounded-md border border-black px-3 py-2 text-sm outline-none"
      v-model="inputValue"
      @focus="onFocus"
      @keydown="handleKeydown"
    />

    <div v-if="isOpen" class="absolute top-full left-0 right-0 z-10 mt-0.5 rounded-md border border-black bg-white">
      <ul class="max-h-44 py-1 overflow-y-auto">
        <li
          v-for="option in filteredOptions"
          :key="option.value"
          class="flex items-center gap-2 px-3 py-2 text-sm cursor-pointer select-none transition-colors hover:bg-neutral-200"
          @mousedown.prevent
          @click="toggle(option.value)"
        >
          <Icon v-if="isSelected(option.value)" name="lucide:check" class="shrink-0 size-4" />
          <span class="break-words min-w-0" :class="isSelected(option.value) ? 'font-medium' : 'pl-6'">
            {{ option.label }}
          </span>
        </li>

        <li v-if="!filteredOptions.length" class="px-3 py-2 text-sm text-black/40 select-none">No options found</li>
      </ul>
    </div>
  </div>
</template>

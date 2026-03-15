<script setup lang="ts">
import { clearRequestError, type Result } from "@/utils/http/request-state";
import { FILE_TYPE } from "~~/shared/constants/file.constant";
import type { PostDto } from "~~/shared/dto/post.dto";

interface FormState {
  coverImage: File | null;
  title: string;
  content: string;
  categories: string[];
}

interface Props {
  post?: PostDto;
}

const props = defineProps<Props>();
const isOpen = defineModel<boolean>({ required: true });

const categoryStore = useCategoryStore();
const { categories } = storeToRefs(categoryStore);

const postStore = usePostStore();
const { state } = storeToRefs(postStore);
const { create, update } = postStore;

const isUpdateMode = computed(() => !!props.post);
const title = computed(() => (!isUpdateMode.value ? "Add Post" : "Update Post"));
const categoryOptions = computed(() =>
  categories.value.map((category) => ({
    label: category.name,
    value: category.name,
  })),
);

const formState = reactive<FormState>({
  coverImage: null,
  title: "",
  content: "",
  categories: [],
});

function removeCategory(name: string) {
  formState.categories = formState.categories.filter((category) => category !== name);
}

function resetForm() {
  Object.assign(formState, {
    title: props.post?.title ?? "",
    content: props.post?.content ?? "",
    categories: props.post?.categories.map((category) => category.name) ?? [],
    coverImage: null,
  });

  clearRequestError(state);
}

watch(isOpen, (opened) => {
  if (opened) {
    resetForm();
  }
});

async function submit() {
  let result: Result<unknown>;
  const formData = new FormData();

  if (formState.coverImage) {
    formData.append("image", formState.coverImage);
  }
  if (formState.title) {
    formData.append("title", formState.title);
  }
  if (formState.content) {
    formData.append("content", formState.content);
  }

  formData.append("categories", JSON.stringify(formState.categories.map((category) => ({ name: category }))));

  if (!isUpdateMode.value) {
    result = await create(formData);
  } else {
    result = await update(props.post!.id, formData);
  }

  if (result.ok) {
    isOpen.value = false;
  }
}
</script>

<template>
  <AppModal :title v-model="isOpen">
    <AppForm :state :submit-label="isUpdateMode ? 'Update' : 'Add'" @submit="submit">
      <AppFileUpload
        id="coverImage"
        label="Cover Image"
        :file-type="FILE_TYPE.COVER"
        :current-image="post?.coverImageURL ?? undefined"
        v-model="formState.coverImage"
      />

      <AppInput type="text" id="title" label="Title" v-model="formState.title" />

      <AppTextarea id="content" label="Content" v-model="formState.content" />

      <div class="flex flex-col gap-2">
        <AppSelect
          id="categories"
          label="Categories"
          :options="categoryOptions"
          placeholder="Select or type categories..."
          v-model="formState.categories"
          multiple
          inputable
        />

        <div v-if="formState.categories.length" class="flex flex-wrap gap-1.5">
          <AppChip
            v-for="category in formState.categories"
            :key="category"
            icon="lucide:x"
            :label="category"
            class="cursor-pointer"
            @click="removeCategory(category)"
          />
        </div>
      </div>
    </AppForm>
  </AppModal>
</template>

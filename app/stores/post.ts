import { PINIA_STORE_KEY } from "@/utils/constants/pinia.constant";
import { withRequestState, type RequestState } from "@/utils/http/request-state";
import type {
  CreatePostResponseDto,
  DeletePostResponseDto,
  GetPostResponseDto,
  GetPostsQueryDto,
  GetPostsResponseDto,
  PostDto,
  UpdatePostResponseDto,
} from "~~/shared/dto/post.dto";

export const usePostStore = defineStore(PINIA_STORE_KEY.POST, () => {
  const posts = ref<PostDto[]>([]);
  const totalPages = ref(0);
  const post = ref<GetPostResponseDto | null>(null);
  const query = ref<GetPostsQueryDto>({});
  const state = reactive<RequestState>({
    isLoading: false,
    error: null,
  });

  async function create(formData: FormData) {
    const result = await withRequestState(state, () =>
      $fetch<CreatePostResponseDto>("/api/posts", { method: "POST", body: formData }),
    );
    if (result.ok) {
      await getAll();
    }

    return result;
  }

  async function getAll() {
    const result = await withRequestState(state, () =>
      $fetch<GetPostsResponseDto>("/api/posts", { query: query.value }),
    );
    if (result.ok) {
      posts.value = result.data.posts;
      totalPages.value = result.data.totalPages;

      return result.data;
    }

    return null;
  }

  async function getByIdOrSlug(idOrSlug: string) {
    post.value = null;

    const result = await withRequestState(state, () => $fetch<GetPostResponseDto>(`/api/posts/${idOrSlug}`));
    if (result.ok) {
      post.value = result.data;

      return result.data;
    }

    return null;
  }

  async function update(id: string, formData: FormData) {
    const result = await withRequestState(state, () =>
      $fetch<UpdatePostResponseDto>(`/api/posts/${id}`, { method: "PATCH", body: formData }),
    );
    if (result.ok) {
      posts.value = posts.value.map((post) => (post.id === result.data.id ? result.data : post));
    }

    return result;
  }

  async function remove(id: string) {
    const result = await withRequestState(state, () =>
      $fetch<DeletePostResponseDto>(`/api/posts/${id}`, { method: "DELETE" }),
    );
    if (result.ok) {
      posts.value = posts.value.filter((post) => post.id !== result.data.id);
    }

    return result;
  }

  return {
    posts,
    totalPages,
    post,
    query,
    state,
    create,
    getAll,
    getByIdOrSlug,
    update,
    remove,
  };
});

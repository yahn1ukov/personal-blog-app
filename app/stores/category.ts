import { PINIA_STORE_KEY } from "@/utils/constants/pinia.constant";
import { withRequestState, type RequestState } from "@/utils/http/request-state";
import type { GetCategoriesResponseDto } from "~~/shared/dto";

export const useCategoryStore = defineStore(PINIA_STORE_KEY.CATEGORY, () => {
  const categories = ref<GetCategoriesResponseDto>([]);
  const state = reactive<RequestState>({
    isLoading: false,
    error: null,
  });

  async function getAll() {
    const result = await withRequestState(state, () => $fetch<GetCategoriesResponseDto>("/api/categories"));
    if (result.ok) {
      categories.value = result.data;
      return result.data;
    }

    return null;
  }

  return {
    categories,
    state,
    getAll,
  };
});

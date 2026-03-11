export interface RequestState {
  isLoading: boolean;
  error: string | null;
}

export async function withRequestState<T>(state: RequestState, fn: () => Promise<T>): Promise<T | null> {
  state.isLoading = true;
  state.error = null;

  return await fn()
    .catch((error: unknown) => {
      state.error = error instanceof Error ? error.message : "Unexpected error";
      console.error(error);
      return null;
    })
    .finally(() => (state.isLoading = false));
}

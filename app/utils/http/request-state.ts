import type { FetchError } from "ofetch";
import { BaseError } from "~~/shared/errors";

export type Result<T> = { ok: true; data: T } | { ok: false; error: BaseError };

export interface RequestState {
  isLoading: boolean;
  error: { message: string } | null;
}

export async function withRequestState<T>(state: Ref<RequestState>, fn: () => Promise<T>): Promise<Result<T>> {
  state.value.isLoading = true;
  state.value.error = null;

  try {
    const data = await fn();

    return { ok: true, data };
  } catch (error: unknown) {
    const fetchError = error as FetchError;

    const baseError = new BaseError(
      fetchError.data?.message ?? fetchError.message ?? "Unexpected error",
      fetchError.status ?? fetchError.statusCode ?? 500,
    );

    state.value.error = { message: baseError.message };

    return { ok: false, error: baseError };
  } finally {
    state.value.isLoading = false;
  }
}

export function clearRequestError(state: Ref<RequestState>) {
  state.value.error = null;
}

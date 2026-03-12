import type { FetchError } from "ofetch";
import { BaseError } from "~~/shared/errors/base.error";

export type Result<T> = { ok: true; data: T } | { ok: false; error: BaseError };

export interface RequestState {
  isLoading: boolean;
  error: BaseError | null;
}

export async function withRequestState<T>(state: RequestState, fn: () => Promise<T>): Promise<Result<T>> {
  state.isLoading = true;
  state.error = null;

  try {
    const data = await fn();

    return { ok: true, data };
  } catch (error: unknown) {
    const fetchError = error as FetchError;

    const baseError = new BaseError(
      fetchError.status ?? 500,
      fetchError.data?.message ?? fetchError.message ?? "Unexpected error",
    );

    state.error = baseError;

    return { ok: false, error: baseError };
  } finally {
    state.isLoading = false;
  }
}

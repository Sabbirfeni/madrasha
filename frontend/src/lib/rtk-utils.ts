import type { SerializedError } from '@reduxjs/toolkit';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';

export function isFetchBaseQueryError(error: unknown): error is FetchBaseQueryError {
  return typeof error === 'object' && error != null && 'status' in error;
}

export function getErrorMessage(error: FetchBaseQueryError | SerializedError | undefined): string {
  if (!error) return 'An unknown error occurred';

  if (isFetchBaseQueryError(error)) {
    if (error.data && typeof error.data === 'object' && 'message' in error.data) {
      return error.data.message as string;
    }
    return `Error: ${error.status}`;
  }

  return error.message || 'An error occurred';
}

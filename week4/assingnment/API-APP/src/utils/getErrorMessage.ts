import type { AxiosError } from "axios";

export const getErrorMessage = (
  err: unknown,
  fallback = "오류가 발생했습니다"
): string => {
  if (
    typeof err === "object" &&
    err !== null &&
    "response" in err &&
    (err as AxiosError).response?.data
  ) {
    const data = (err as AxiosError).response?.data as { message?: string };
    return data.message ?? fallback;
  }

  return fallback;
};

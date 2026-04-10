// Simple helper to pull the error message from an API error.
// If the backend sent a message, we show that. Otherwise we show a fallback.
//
// Usage:
//   catch (err) {
//     toast.error(getErrorMessage(err, "Something went wrong"));
//   }

export const getErrorMessage = (err: unknown, fallback: string): string => {
  const error = err as { response?: { data?: { message?: string } } };
  return error?.response?.data?.message || fallback;
};

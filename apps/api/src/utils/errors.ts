import { AppError } from "./errorClasses";

export function isUniqueViolation(error: unknown) {
  return (
    error &&
    typeof error === "object" &&
    "code" in error &&
    error.code === "23505"
  );
}

export function isValidationError(error: unknown) {
  return error && typeof error === "object" && "validation" in error;
}

export function isAppError(error: unknown) {
  return error instanceof AppError;
}

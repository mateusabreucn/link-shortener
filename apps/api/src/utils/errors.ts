import { Error } from "postgres";

export function isUniqueViolation(error: Error): boolean {
  return (
    error &&
    typeof error === "object" &&
    "code" in error &&
    error.code === "23505"
  );
}

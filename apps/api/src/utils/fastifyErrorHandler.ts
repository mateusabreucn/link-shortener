import { FastifyReply, FastifyRequest } from "fastify";
import { isAppError, isUniqueViolation, isValidationError } from "./errors";
import { CodeAlreadyInUseError, ValidationError } from "./errorClasses";

export function fastifyErrorHandler(
  error: unknown,
  req: FastifyRequest,
  res: FastifyReply,
) {
  if (isAppError(error)) {
    return res.status(error.statusCode).send({ message: error.message });
  }

  if (isValidationError(error)) {
    const newError = new ValidationError();
    return res.status(newError.statusCode).send({ message: newError.message });
  }

  if (isUniqueViolation(error)) {
    const newError = new CodeAlreadyInUseError();
    return res.status(newError.statusCode).send({ message: newError.message });
  }

  req.log.error(error);
  return res.status(500).send({ message: "Internal server error" });
}

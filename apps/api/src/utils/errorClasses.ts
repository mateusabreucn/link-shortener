export class AppError extends Error {
  constructor(
    message: string,
    public statusCode: number,
  ) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class CodeAlreadyInUseError extends AppError {
  constructor() {
    super("Code already in use", 409);
  }
}

export class CodeNotFoundError extends AppError {
  constructor() {
    super("Code not found", 404);
  }
}

export class ValidationError extends AppError {
  constructor() {
    super("Validation Error", 400);
  }
}

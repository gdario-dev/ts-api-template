export type Optional<T> = T | undefined;

// -----------------------------------------------------------------------------
export class Result<T> {
  private constructor(
    readonly value: Optional<T>,
    readonly error: Optional<DomainError>
  ) {}

  static ok = <T>(value: T): Result<T> => new Result<T>(value, undefined);

  static fail = <T>(error: DomainError | string): Result<T> => {
    const err = error instanceof DomainError ? error : new DomainError(error);

    return new Result<T>(undefined, err);
  };

  isSuccess(): boolean {
    return this.value !== undefined;
  }

  unwrap(): T {
    if (!this.value) this.throw();

    return this.value as T;
  }

  private throw(): void {
    if (this.error) throw this.error;

    throw new Error("Unhandled state unwrapping result");
  }
}

export type AsyncResult<T> = Promise<Result<T>>;

// -----------------------------------------------------------------------------
export class DomainError extends Error {
  constructor(
    readonly message: string,
    readonly type: DomainErrorType = "Internal"
  ) {
    super(message);
  }

  static default(): DomainError {
    return new DomainError("Internal error");
  }
  static copy(err: DomainError) {
    return new DomainError(err.message, err.type);
  }
}

export type DomainErrorType = "Internal" | "Client" | "External" | "Notfound";

// -----------------------------------------------------------------------------
export type AsyncDomainResult<T> = Promise<DomainResult<T>>;
export class DomainResult<T> {
  private constructor(
    readonly value: Optional<T>,
    readonly error: Optional<DomainError>
  ) {}

  static ok = <T>(value: T): DomainResult<T> =>
    new DomainResult<T>(value, undefined);

  static fail = <T>(error: DomainError | string): DomainResult<T> => {
    const err = error instanceof DomainError ? error : new DomainError(error);

    return new DomainResult<T>(undefined, err);
  };

  static from = <T>(result: Result<T>): DomainResult<T> => {
    return new DomainResult(result.value, result.error);
  };

  isSuccess(): boolean {
    return this.value !== undefined;
  }

  unwrap(): T {
    if (!this.value) this.throw();

    return this.value as T;
  }

  private throw(): void {
    if (this.error) throw this.error;

    throw new Error("Unhandled state unwrapping result");
  }
}

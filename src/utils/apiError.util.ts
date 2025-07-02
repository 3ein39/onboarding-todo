import type { ApiError } from '@/types/apiError.type.ts'

export class ApiErrorUtil {
  static getCode(error: ApiError): string | null {
    return error.errors?.[0]?.code ?? null
  }

  static getMessage(error: ApiError): string | null {
    return error.errors?.[0]?.detail ?? null
  }

  static isError(error: unknown): error is ApiError {
    return (error as ApiError)?.errors !== undefined
  }
}

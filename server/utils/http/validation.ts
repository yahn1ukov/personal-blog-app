import { H3Event } from "h3";
import type { ZodError, ZodType } from "zod";
import { BadRequestError } from "~~/shared/errors";
import type { FileMetadata } from "~~/shared/types";

type SafeParseResult<T> = { success: true; data: T } | { success: false; error: ZodError<T> };

async function handleValidationResult<T>(validationFn: Promise<SafeParseResult<T>>, errorMessage: string): Promise<T> {
  const result = await validationFn;
  if (!result.success) {
    throw new BadRequestError(result.error.issues[0]?.message ?? errorMessage);
  }

  return result.data;
}

export async function validateBody<T>(event: H3Event, schema: ZodType<T>): Promise<T> {
  return handleValidationResult(readValidatedBody(event, schema.safeParse), "Invalid request body");
}

export async function validateParams<T>(event: H3Event, schema: ZodType<T>): Promise<T> {
  return handleValidationResult(getValidatedRouterParams(event, schema.safeParse), "Invalid URL parameters");
}

export async function validateQuery<T>(event: H3Event, schema: ZodType<T>): Promise<T> {
  return handleValidationResult(getValidatedQuery(event, schema.safeParse), "Invalid query parameters");
}

export async function validateMultipartFormData<T>(
  event: H3Event,
  schema: ZodType<T>,
): Promise<T & { image?: FileMetadata }> {
  const formData = await readMultipartFormData(event);
  if (!formData || !formData.length) {
    throw new BadRequestError("Invalid request body");
  }

  let image: FileMetadata | undefined;
  let body: Record<string, unknown> = {};

  for (const part of formData) {
    if (part.name === "image" && part.filename && part.type) {
      image = {
        filename: part.filename,
        mimetype: part.type,
        data: part.data,
      };
    } else {
      const value = part.data.toString("utf-8");

      if (part.name === "categories") {
        try {
          body[part.name] = JSON.parse(value);
        } catch {
          throw new BadRequestError("Invalid request body");
        }
      } else if (part.name) {
        body[part.name] = value;
      }
    }
  }

  const validated = schema.safeParse(body);
  if (!validated.success) {
    throw new BadRequestError(validated.error.issues[0]?.message ?? "Invalid request body");
  }

  return {
    image,
    ...validated.data,
  };
}

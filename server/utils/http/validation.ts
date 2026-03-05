import { H3Event } from "h3";
import type { ZodSchema } from "zod";
import { BadRequestError } from "../errors";
import type { FileMetadata } from "../types/file.type";

async function handleValidationResult<T>(
  validationFn: Promise<{ success: boolean; data?: T; error?: unknown }>,
  errorMessage: string,
): Promise<T> {
  const result = await validationFn;
  if (!result.success) {
    throw new BadRequestError(errorMessage);
  }

  return result.data as T;
}

export async function validateBody<T>(event: H3Event, schema: ZodSchema<T>): Promise<T> {
  return handleValidationResult(readValidatedBody(event, schema.safeParse), "Invalid request body");
}

export async function validateParams<T>(event: H3Event, schema: ZodSchema<T>): Promise<T> {
  return handleValidationResult(getValidatedRouterParams(event, schema.safeParse), "Invalid URL parameters");
}

export async function validateQuery<T>(event: H3Event, schema: ZodSchema<T>): Promise<T> {
  return handleValidationResult(getValidatedQuery(event, schema.safeParse), "Invalid query parameters");
}

export async function validateMultipartFormData<T>(
  event: H3Event,
  schema: ZodSchema<T>,
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
        body[part.name] = JSON.parse(value);
      } else if (part.name) {
        body[part.name] = value;
      }
    }
  }

  const validated = schema.safeParse(body);
  if (!validated.success) {
    throw new BadRequestError("Invalid request body");
  }

  return {
    image,
    ...validated.data,
  };
}

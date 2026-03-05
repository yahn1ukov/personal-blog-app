import { getS3URL } from "./minio";

export function formatSlug(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function formatDateToISO(date: Date): string {
  return date.toISOString();
}

export function formatImageURL(imageURL: string | null): string | null {
  return imageURL && `${getS3URL()}/${imageURL}`;
}

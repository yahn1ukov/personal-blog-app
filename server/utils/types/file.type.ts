import { FILE_TYPE } from "../constants/file.constant";

export interface FileMetadata {
  filename: string;
  mimetype: string;
  data: Buffer<ArrayBufferLike>;
}

export type FileType = (typeof FILE_TYPE)[keyof typeof FILE_TYPE];

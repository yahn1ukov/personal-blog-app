export interface FileMetadata {
  filename: string;
  mimetype: string;
  data: Buffer<ArrayBufferLike>;
}

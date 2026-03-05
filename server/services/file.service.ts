import { FILE_TYPE } from "../utils/constants/file.constant";
import { InternalServerError } from "../utils/errors";
import { getS3Bucket, minioClient } from "../utils/minio";
import type { FileMetadata, FileType } from "../utils/types/file.type";

class FileService {
  async upload(userId: string, type: FileType, image: FileMetadata): Promise<string> {
    const objectName = this.generateObjectName(userId, type, image.filename);

    await minioClient
      .putObject(getS3Bucket(), objectName, image.data, image.data.length, {
        "Content-Type": image.mimetype,
      })
      .catch(() => {
        throw new InternalServerError("Failed to upload image");
      });

    return objectName;
  }

  private generateObjectName(userId: string, type: FileType, filename: string): string {
    const timestamp = Date.now();

    let objectName: string;
    if (type === FILE_TYPE.COVER) {
      objectName = `posts/${userId}/${timestamp}-${filename}`;
    } else if (type === FILE_TYPE.AVATAR) {
      objectName = `avatars/${userId}/${timestamp}-${filename}`;
    } else {
      throw new InternalServerError("Unknown file type");
    }

    return objectName;
  }
}

export const fileService = new FileService();

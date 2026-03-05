import { minioClient } from "../utils/minio";

export default defineNitroPlugin(async () => {
  const config = useRuntimeConfig();

  const bucketExists = await minioClient.bucketExists(config.s3Bucket);
  if (!bucketExists) {
    await minioClient.makeBucket(config.s3Bucket, config.s3Region);
  }
});

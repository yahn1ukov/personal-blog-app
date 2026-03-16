import { minioClient } from "../utils/minio";

export default defineNitroPlugin(async () => {
  try {
    const config = useRuntimeConfig();

    const bucketExists = await minioClient.bucketExists(config.s3Bucket);
    if (!bucketExists) {
      await minioClient.makeBucket(config.s3Bucket, config.s3Region);
    }

    const policy = {
      Version: "2012-10-17",
      Statement: [
        {
          Effect: "Allow",
          Principal: { AWS: ["*"] },
          Action: ["s3:GetObject"],
          Resource: [`arn:aws:s3:::${config.s3Bucket}/*`],
        },
      ],
    };

    await minioClient.setBucketPolicy(config.s3Bucket, JSON.stringify(policy));
  } catch (error: unknown) {
    console.log("Failed to initialize MinIO bucket");
    throw error;
  }
});

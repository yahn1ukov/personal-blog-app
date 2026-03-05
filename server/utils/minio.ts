import { Client } from "minio";

function minioClientSingleton() {
  const config = useRuntimeConfig();

  return new Client({
    endPoint: config.s3Endpoint,
    port: config.s3Port,
    accessKey: config.s3AccessKey,
    secretKey: config.s3SecretKey,
    useSSL: config.s3UseSSL,
  });
}

type MinioClientType = ReturnType<typeof minioClientSingleton>;

const globalForMinio = globalThis as unknown as {
  minio: MinioClientType | undefined;
};

export const minioClient = globalForMinio.minio ?? minioClientSingleton();

if (process.env.NODE_ENV !== "production") {
  globalForMinio.minio = minioClient;
}

export function getS3Bucket() {
  const config = useRuntimeConfig();

  return config.s3Bucket;
}

export function getS3URL() {
  const config = useRuntimeConfig();

  const protocol = config.s3UseSSL ? "https" : "http";

  return `${protocol}://${config.s3Endpoint}:${config.s3Port}/${config.s3Bucket}`;
}

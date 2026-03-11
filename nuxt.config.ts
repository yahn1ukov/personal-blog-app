export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  modules: ["@pinia/nuxt", "@nuxtjs/tailwindcss", "@nuxt/icon", "@vueuse/nuxt"],
  devtools: {
    enabled: process.env.NODE_ENV === "development",
  },
  runtimeConfig: {
    isDev: process.env.NODE_ENV === "development",

    databaseURL: process.env.DATABASE_URL || "",

    jwtSecret: process.env.JWT_SECRET || "",
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || "",
    jwtAudience: process.env.JWT_AUDIENCE || "",
    jwtIssuer: process.env.JWT_ISSUER || "",

    jwtCookieName: process.env.JWT_COOKIE_NAME || "",
    jwtCookieHttpOnly: process.env.JWT_COOKIE_HTTP_ONLY === "true",
    jwtCookieSecure: process.env.JWT_COOKIE_SECURE === "true",
    jwtCookieMaxAge: parseInt(process.env.JWT_COOKIE_MAX_AGE || ""),
    jwtCookiePath: process.env.JWT_COOKIE_PATH || "",
    jwtCookieSameSite: process.env.JWT_COOKIE_SAME_SITE || "",

    s3Endpoint: process.env.S3_ENDPOINT || "",
    s3Port: parseInt(process.env.S3_PORT || ""),
    s3AccessKey: process.env.S3_ACCESS_KEY || "",
    s3SecretKey: process.env.S3_SECRET_KEY || "",
    s3Bucket: process.env.S3_BUCKET || "",
    s3Region: process.env.S3_REGION || "",
    s3UseSSL: process.env.MINIO_USE_SSL === "true",
  },
  routeRules: {
    "/api/**": {
      cors: true,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Origin, Content-Type, Accept, Authorization",
      },
    },
  },
});

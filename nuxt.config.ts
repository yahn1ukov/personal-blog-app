export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  modules: ["@pinia/nuxt", "@nuxtjs/tailwindcss", "@nuxt/icon", "@vueuse/nuxt"],
  devtools: {
    enabled: process.env.NODE_ENV === "development",
  },
  runtimeConfig: {
    databaseURL: process.env.NUXT_DATABASE_URL || "",

    jwtSecret: process.env.NUXT_JWT_SECRET || "",
    jwtExpiresIn: process.env.NUXT_JWT_EXPIRES_IN || "",
    jwtAudience: process.env.NUXT_JWT_AUDIENCE || "",
    jwtIssuer: process.env.NUXT_JWT_ISSUER || "",

    jwtCookieName: process.env.NUXT_JWT_COOKIE_NAME || "",
    jwtCookieHttpOnly: process.env.NUXT_JWT_COOKIE_HTTP_ONLY === "true",
    jwtCookieSecure: process.env.NUXT_JWT_COOKIE_SECURE === "true",
    jwtCookieMaxAge: parseInt(process.env.NUXT_JWT_COOKIE_MAX_AGE || "0"),
    jwtCookiePath: process.env.NUXT_JWT_COOKIE_PATH || "",
    jwtCookieSameSite: process.env.NUXT_JWT_COOKIE_SAME_SITE || "",

    s3PublicEndpoint: process.env.NUXT_S3_PUBLIC_ENDPOINT || "",
    s3Endpoint: process.env.NUXT_S3_ENDPOINT || "",
    s3Port: parseInt(process.env.NUXT_S3_PORT || "0"),
    s3AccessKey: process.env.NUXT_S3_ACCESS_KEY || "",
    s3SecretKey: process.env.NUXT_S3_SECRET_KEY || "",
    s3Bucket: process.env.NUXT_S3_BUCKET || "",
    s3Region: process.env.NUXT_S3_REGION || "",
    s3UseSSL: process.env.NUXT_S3_USE_SSL === "true",
  },
});

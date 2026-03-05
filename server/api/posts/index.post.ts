import { postService } from "~~/server/services/post.service";
import { defineProtectedController } from "~~/server/utils/http/auth/protected-controller";
import { validateMultipartFormData } from "~~/server/utils/http/validation";
import { CreatePostBodySchema } from "~~/server/utils/schemas/post.schema";

export default defineProtectedController(async (event) => {
  const body = await validateMultipartFormData(event, CreatePostBodySchema);

  const { image, ...data } = body;

  return postService.create(event.context.user.id, {
    ...data,
    coverImage: image,
  });
});

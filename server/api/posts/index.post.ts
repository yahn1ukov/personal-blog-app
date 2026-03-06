import { CreatePostBodySchema } from "~~/shared/schemas/post.schema";
import { postService } from "../../services/post.service";
import { defineProtectedController } from "../../utils/http/auth/protected-controller";
import { validateMultipartFormData } from "../../utils/http/validation";

export default defineProtectedController(async (event) => {
  const body = await validateMultipartFormData(event, CreatePostBodySchema);

  const { image, ...data } = body;

  return postService.create(event.context.user.id, {
    ...data,
    coverImage: image,
  });
});

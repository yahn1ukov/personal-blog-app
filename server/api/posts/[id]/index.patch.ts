import { postService } from "~~/server/services/post.service";
import { defineProtectedController } from "~~/server/utils/http/auth/protected-controller";
import { validateMultipartFormData, validateParams } from "~~/server/utils/http/validation";
import { UpdatePostBodySchema, UpdatePostParamsSchema } from "~~/server/utils/schemas/post.schema";

export default defineProtectedController(async (event) => {
  const [params, body] = await Promise.all([
    validateParams(event, UpdatePostParamsSchema),
    validateMultipartFormData(event, UpdatePostBodySchema),
  ]);

  const { image, ...data } = body;

  return postService.updateById(params.id, event.context.user.id, {
    ...data,
    coverImage: image,
  });
});

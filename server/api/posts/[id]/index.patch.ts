import { UpdatePostBodySchema, UpdatePostParamsSchema } from "~~/shared/schemas/post.schema";
import { postService } from "../../../services/post.service";
import { defineProtectedController } from "../../../utils/http/auth/protected-controller";
import { validateMultipartFormData, validateParams } from "../../../utils/http/validation";

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

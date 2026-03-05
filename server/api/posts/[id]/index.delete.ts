import { postService } from "~~/server/services/post.service";
import { defineProtectedController } from "~~/server/utils/http/auth/protected-controller";
import { validateParams } from "~~/server/utils/http/validation";
import { DeletePostParamsSchema } from "~~/server/utils/schemas/post.schema";

export default defineProtectedController(async (event) => {
  const params = await validateParams(event, DeletePostParamsSchema);

  return postService.deleteById(params.id, event.context.user.id);
});

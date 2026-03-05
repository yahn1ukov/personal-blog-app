import { postService } from "~~/server/services/post.service";
import { defineController } from "~~/server/utils/http/controller";
import { validateParams } from "~~/server/utils/http/validation";
import { GetPostParamsSchema } from "~~/server/utils/schemas/post.schema";

export default defineController(async (event) => {
  const params = await validateParams(event, GetPostParamsSchema);

  return postService.getByIdOrSlug(params.id);
});

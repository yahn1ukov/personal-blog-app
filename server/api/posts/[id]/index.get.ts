import { GetPostParamsSchema } from "~~/shared/schemas/post.schema";
import { postService } from "../../../services/post.service";
import { defineController } from "../../../utils/http/controller";
import { validateParams } from "../../../utils/http/validation";

export default defineController(async (event) => {
  const params = await validateParams(event, GetPostParamsSchema);

  return postService.getByIdOrSlug(params.id);
});

import { postService } from "~~/server/services/post.service";
import { defineController } from "~~/server/utils/http/controller";
import { validateQuery } from "~~/server/utils/http/validation";
import { GetPostsQuerySchema } from "~~/server/utils/schemas/post.schema";

export default defineController(async (event) => {
  const query = await validateQuery(event, GetPostsQuerySchema);

  return postService.getAll(query);
});

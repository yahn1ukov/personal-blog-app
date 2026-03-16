import { GetPostsQuerySchema } from "~~/shared/schemas";
import { postService } from "../../services/post.service";
import { defineController } from "../../utils/http/controller";
import { validateQuery } from "../../utils/http/validation";

export default defineController(async (event) => {
  const query = await validateQuery(event, GetPostsQuerySchema);

  return postService.getAll(query);
});

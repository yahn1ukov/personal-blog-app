import { DeletePostParamsSchema } from "~~/shared/schemas/post.schema";
import { postService } from "../../../services/post.service";
import { defineProtectedController } from "../../../utils/http/auth/protected-controller";
import { validateParams } from "../../../utils/http/validation";

export default defineProtectedController(async (event) => {
  const params = await validateParams(event, DeletePostParamsSchema);

  return postService.deleteById(params.id, event.context.user.id);
});

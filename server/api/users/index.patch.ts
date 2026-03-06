import { UpdateUserBodySchema } from "~~/shared/schemas/user.schema";
import { userService } from "../../services/user.service";
import { defineProtectedController } from "../../utils/http/auth/protected-controller";
import { validateMultipartFormData } from "../../utils/http/validation";

export default defineProtectedController(async (event) => {
  const body = await validateMultipartFormData(event, UpdateUserBodySchema);

  const { image, ...data } = body;

  return userService.updateById(event.context.user.id, {
    ...data,
    avatarImage: image,
  });
});

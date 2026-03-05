import { categoryService } from "~~/server/services/category.service";
import { defineController } from "~~/server/utils/http/controller";

export default defineController(async () => {
  return categoryService.getAll();
});

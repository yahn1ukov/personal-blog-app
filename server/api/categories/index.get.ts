import { categoryService } from "../../services/category.service";
import { defineController } from "../../utils/http/controller";

export default defineController(async () => {
  return categoryService.getAll();
});

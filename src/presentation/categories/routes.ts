import { Router } from "express";
import { CategoriesController } from "./controller";
import { CategoryService } from "../services";
import { AuthMiddleware } from "../middlewares";

export class CategoriesRoutes {

	static get routes():Router{
		const router = Router();

		const categoryService = new CategoryService()
		const categoryController = new CategoriesController(categoryService);

		router.use(AuthMiddleware.verifyToken);

		router.get('/',categoryController.getAllCategories);

		return router;
	}

}
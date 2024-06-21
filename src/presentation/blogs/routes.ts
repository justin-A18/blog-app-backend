import { Router } from "express";
import { AuthMiddleware,BlogsMiddleware } from "../middlewares";
import { BlogsController } from "./controller";
import { BlogService } from "../services";

export class BlogsRoutes {

	static get routes (): Router {
		const router = Router();

		const blogService = new BlogService();
		const blogController = new BlogsController(blogService);

		router.use( AuthMiddleware.verifyToken );

		router.get('/', blogController.getAllBlogs);
		router.get('/:id', blogController.getBlogById);
		router.post('/new', blogController.createBlog);
		router.put('/:id', [BlogsMiddleware.permissionToActions], blogController.updateBlog);
		router.delete('/:id', [BlogsMiddleware.permissionToActions], blogController.deleteBlog)

		return router;
	}

}
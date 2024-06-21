import { Router } from "express";

import { AuthRoutes } from "./auth/routes";
import { BlogsRoutes } from "./blogs/routes";
import { UsersRoutes } from "./users/routes";
import { CategoriesRoutes } from "./categories/routes";
import { SearchRoutes } from "./search/routes";

export class AppRoutes {

	static get routes(): Router{

		const router = Router();

		router.use('/api/auth',AuthRoutes.routes);
		router.use('/api/blogs',BlogsRoutes.routes);
		router.use('/api/users',UsersRoutes.routes);
		router.use('/api/search',SearchRoutes.routes);
		router.use('/api/categories',CategoriesRoutes.routes);

		return router;
	}

}
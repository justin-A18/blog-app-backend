import { Router } from "express";
import { SearchController } from "./controller";
import { SearchService } from "../services/search.service";
import { AuthMiddleware } from "../middlewares";

export class SearchRoutes {

	static get routes(): Router{
		const router = Router();

		const searchService = new SearchService()
		const searchController = new SearchController(searchService);

		router.use(AuthMiddleware.verifyToken)

		router.get('/:collection/:term',searchController.search);

		return router;
	}

}
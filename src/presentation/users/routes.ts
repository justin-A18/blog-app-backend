import { Router } from "express";
import { UsersController } from "./controller";
import { AuthMiddleware } from "../middlewares";
import { UserService } from "../services";

export class UsersRoutes {

	static get routes():Router{
		const router = Router();

		const userService = new UserService()
		const userController = new UsersController(userService);

		router.use(AuthMiddleware.verifyToken);

		router.get('/',userController.getAllUsers);
		router.get('/:id',userController.getUserById);

		return router;
	}

}
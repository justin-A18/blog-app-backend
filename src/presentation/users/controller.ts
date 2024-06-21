import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { ErrorHandler } from "../../domain/errors";

export class UsersController{
	constructor(
		private userService: UserService
	){}

	getAllUsers = (req: Request,res: Response) => {
		const { limit, per_page } = req.query;

		this.userService.getAllUsers(Number(limit),Number(per_page))
			.then(data => res.status(200).json(data))
			.catch(err => ErrorHandler.handle(err,res))
	}

	getUserById = (req: Request,res: Response) => {
		this.userService.getUserById(req.params.id)
			.then(data => res.status(200).json(data))
			.catch(err => ErrorHandler.handle(err,res))
	}
}
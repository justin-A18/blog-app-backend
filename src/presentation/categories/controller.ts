import { Request, Response } from "express";
import { CategoryService } from "../services";
import { ErrorHandler } from "../../domain/errors";

export class CategoriesController {
	constructor(
		private categoryService: CategoryService
	){}

	getAllCategories = (req:Request,res:Response) => {
		const { limit, per_page } = req.query;

		this.categoryService.getAllCategories(Number(limit), Number(per_page))
			.then((data) => res.status(200).json(data))
			.catch((err) => ErrorHandler.handle(err,res));
	}
}
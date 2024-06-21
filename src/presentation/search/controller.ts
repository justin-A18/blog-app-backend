import { Request, Response } from "express";
import { SearchService } from "../services";
import { ErrorHandler } from "../../domain/errors";

export class SearchController {
	constructor(
		private searchService: SearchService
	){}

	search = (req: Request, res: Response) => {
		const {collection, term} = req.params;

		this.searchService.search(collection,term)
			.then(data => res.status(200).json(data))
			.catch(error => ErrorHandler.handle(error, res));
	}
}
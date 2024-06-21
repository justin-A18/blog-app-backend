import { Request, Response } from "express";
import { CreateBlogDto, UpdateBlogDto } from "../../domain/dto/blogs";
import { BlogService } from "../services";
import { ErrorHandler } from "../../domain/errors";

export class BlogsController{
	
	constructor(
		private blogService: BlogService
	){}

	getAllBlogs = (req: Request,res: Response) => {
		const { limit, per_page } = req.query;

		this.blogService.getAllBlogs(Number(limit),Number(per_page))
			.then(data => res.status(200).json(data))
			.catch(err => ErrorHandler.handle(err,res))
	}
	
	getBlogById = (req:Request,res:Response) =>{
		const { id } = req.params;

		this.blogService.getBlogById(id)
			.then(data => res.status(200).json(data))
			.catch(err => ErrorHandler.handle(err,res))
	}

	createBlog = (req: Request,res: Response) => {

		const [error,createBlogDto] = CreateBlogDto.create({
			...req.body,
			createAt: new Date()
		});

		if(error) return res.status(400).json({ error });

		this.blogService.createBlog(createBlogDto!)
			.then(blog => res.status(201).json(blog))
			.catch(err => ErrorHandler.handle(err,res))
	}

	updateBlog = (req: Request,res: Response) => {
		const [error,updateBlogDto] = UpdateBlogDto.create(req.body);

		if(error) return res.status(400).json({ error });

		const { id } = req.params

		this.blogService.updateBlog(id,updateBlogDto!)
			.then(data => res.status(200).json(data))
			.catch(err => ErrorHandler.handle(err,res))
	}

	deleteBlog = (req: Request,res: Response) => {
		const { id } = req.params

		this.blogService.deleteBlog(id)
			.then(data => res.status(200).json(data))
			.catch(err => ErrorHandler.handle(err,res))
	}
}
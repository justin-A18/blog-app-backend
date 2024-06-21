import { NextFunction, Request, Response } from "express";
import { BlogModel } from "../../database";

export class BlogsMiddleware {
	public static async permissionToActions(req:Request,res: Response,next: NextFunction){
		try {
			const { id } = req.params;
			const findBlog = await BlogModel.findById(id);

			if(findBlog?.user?.toString() !== req.body.user.toString()){
				return res.status(400).json({error: "You can not do this action"});
			}

			next();
		} catch (error) {
			res.status(500).json({ error: "Internal server error" });
		}
	}
}
import { CustomError } from "../errors";

export class BlogEntity {

	constructor(
		public readonly id: string,
		public readonly title: string,
		public readonly description: string,
		public readonly category: string,
		public readonly user: string,
		public readonly createAt: Date,
		public readonly image: string | null = null,
	){}

	public static fromObject(object: {[key:string]: any}):BlogEntity {
		const {id, _id, title, description, category, user, createAt, image} = object;

		if(!id && !_id) throw CustomError.badRequest("Missing id");
		if(!title) throw CustomError.badRequest("Missing title");
		if(!description) throw CustomError.badRequest("Missing description");
		if(!category) throw CustomError.badRequest("Missing category");
		if(!user) throw CustomError.badRequest("Missing user");
		if(!createAt) throw CustomError.badRequest("Missing createdAt");

		return new BlogEntity(id || _id, title, description, category, user,createAt, image);
	}

}
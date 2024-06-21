import { Validators } from "../../../config/validations";

export class CreateBlogDto {

	constructor(
		public readonly title: string,
		public readonly description: string,
		public readonly category: string,
		public readonly user: string,
		public readonly createAt: Date,
		public readonly image: string | null = null,
	){}

	static create(object: {[key: string]:any}): [string?,CreateBlogDto?] {
		const {title, description, category, user, createAt, image} = object;

		if(!title) return ['Title is required'];
		if(!description) return ['Description is required'];
		
		if(!category) return ['Category is required'];
		if(!Validators.isMongoID(category)) return ['Category is invalid'];
		
		if(!user) return ['User is required'];
		if(!Validators.isMongoID(user)) return ['User is invalid'];
		
		if(!createAt) return ['CreateAt is required'];
		
		return [undefined, new CreateBlogDto(title, description, category, user, createAt, image)];
	}

}
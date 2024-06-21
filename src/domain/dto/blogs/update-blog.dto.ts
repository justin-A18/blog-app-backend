import { Validators } from "../../../config/validations";

export class UpdateBlogDto {

	constructor(
		public readonly title: string,
		public readonly description: string,
		public readonly category: string,
		public readonly user: string,
		public readonly image?: string,
	){}

	static create(object: {[key: string]:any}): [string?,UpdateBlogDto?] {
		const {title, description, category, user, image} = object;

		if(!title) return ['Title is required'];
		if(!description) return ['Description is required'];
		
		if(!category) return ['Category is required'];
		if(!Validators.isMongoID(category)) return ['Category is invalid'];

		if(!user) return ['User is required'];
		if(!Validators.isMongoID(user)) return ['User is invalid'];

		return [undefined, new UpdateBlogDto(title, description, category, user, image)];
	}

}
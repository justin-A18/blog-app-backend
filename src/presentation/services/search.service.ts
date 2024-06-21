import { Validators } from "../../config/validations";
import { BlogModel, UserModel } from "../../database";
import { CustomError } from "../../domain/errors";

export class SearchService {
	private get collectionsValid() {
		return ['users', 'blogs'];
	}

	public async searchUser(term: string) {
		try{
			const isMongoId = Validators.isMongoID(term);

			if(isMongoId){
				const user = await UserModel.findOne({ _id: term });
				
				return {
					results: user ? [user] : [],
				}
			}
	
			const regex = new RegExp(term, 'i');
			const users = await UserModel
				.find({ $or: [{ username: regex }] })
				.select('-email')
			
			return {
				results: users ? users : [],
			}
		}catch(error){
			throw CustomError.internalServer(`${error}`);	
		}
	}
	
	public async searchBlogs(term: string){
		try {
			const isMongoId = Validators.isMongoID(term);

			if(isMongoId){
				const blog = await BlogModel.findOne({ _id: term });
			
				return {
					results: blog ? [blog] : [],
				}
			}

			const regex = new RegExp(term, 'i');
			const blogs = await BlogModel.find({
				$or: [{ title: regex }, { description: regex }, { 'category.name': regex },{'user.username': regex}],
			});

			return {
				results: blogs ? [blogs] : []
			}
		} catch (error) {
			throw CustomError.internalServer(`${error}`);	

		}
	}

	public async search(collection: string,term: string) {
		try {
			const isValid = this.collectionsValid.includes(collection);

			if (!isValid) {
				throw CustomError.badRequest(`Permissible collections are: ${this.collectionsValid.join(', ')}`);
			}

			switch (collection) {
				case 'users':
					return await this.searchUser(term);
				case 'blogs':
					return await this.searchBlogs(term);
				default: 
					throw CustomError.badRequest(`Permissible collections are: ${this.collectionsValid.join(', ')}`);
			}

		} catch (error) {
			throw CustomError.internalServer(`${error}`);	
		}
	}
}
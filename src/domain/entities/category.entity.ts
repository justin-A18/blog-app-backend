import { CustomError } from "../errors";

export class CategoryEntity {
	constructor(
		public readonly id: string,
		public readonly name: string
	){}

	public static fromObject(object: {[key: string]: any}): CategoryEntity {
		const {id,_id,name} = object;

		if(!id && !_id) throw CustomError.badRequest("Missing id");
		if(!name) throw CustomError.badRequest("Missing name");

		return new CategoryEntity(id || _id, name);
	}
}
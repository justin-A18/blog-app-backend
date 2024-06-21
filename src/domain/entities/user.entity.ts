import { CustomError } from "../errors";

export class UserEntity {
	constructor(
		public readonly id: string,
		public readonly username: string,
		public readonly email: string,
		public readonly password: string,
		public readonly avatar?: string
	){}

	public static fromObject(object: {[key: string]: any}): UserEntity {
		const {id,_id,username,email,password,avatar} = object;

		if (!_id && !id) throw CustomError.badRequest("Missing id");
		if (!username) throw CustomError.badRequest("Missing username");
		if (!email) throw CustomError.badRequest("Missing email");
		if (!password) throw CustomError.badRequest("Missing password");

		return new UserEntity(id || _id, username, email, password, avatar);
 	}
}
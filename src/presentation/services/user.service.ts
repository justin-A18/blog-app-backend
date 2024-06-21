import { UserModel } from "../../database";
import { UserEntity } from "../../domain/entities";
import { CustomError } from "../../domain/errors";

export class UserService {
	public async getAllUsers (limit: number = 5, per_page: number = 0) {
		const [total,users] = await Promise.all([
			UserModel.countDocuments(),
			UserModel.find()
			.skip(Number(per_page))
			.limit(Number(limit))
			.select('-email')  // Excluir el campo email
		])

		return {
			total,
			users,
		}
	}

	public async getUserById(id: string) {
		const user = await UserModel.findById(id);
		if(!user) throw CustomError.badRequest('User not found with this id');

		const {password, email, ...userEntity} = UserEntity.fromObject(user)

		return {
			user: userEntity
		}
	}
}


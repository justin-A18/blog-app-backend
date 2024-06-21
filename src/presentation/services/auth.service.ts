import { BcryptAdapter, JwtAdapter } from "../../config/adapters";
import { LoginUserDto, RegisterUserDto } from "../../domain/dto/auth";
import { UserEntity } from "../../domain/entities";
import { CustomError } from "../../domain/errors";
import { UserModel } from "../../database";

export class AuthService {
	public async register(registerUserDto: RegisterUserDto){
		try {
			const userExists = await UserModel.findOne({ email: registerUserDto.email });
			if (userExists) throw CustomError.badRequest("Email already exists");

			const user = await UserModel.create(registerUserDto);
			user.password = BcryptAdapter.hash(registerUserDto.password);

			const token = await JwtAdapter.generateJwt({userId: user.id});
      if (!token) throw CustomError.internalServer("Error while creating JWT");

			await user.save();

			const {password, email,...userEntity} = UserEntity.fromObject(user);

			return {
				user:userEntity,
				token,
			};
		} catch (error) {
			throw CustomError.internalServer(`${error}`);
		}
	}
	
	public async login(loginUserDto: LoginUserDto){
		try {
			const user = await UserModel.findOne({ email: loginUserDto.email });
			if (!user) throw CustomError.badRequest("Invalid credentials");

			const isMatching = BcryptAdapter.compare(loginUserDto.password, user.password);
			if (!isMatching) throw CustomError.badRequest("Invalid credentials");

			const token = await JwtAdapter.generateJwt({userId: user.id});
			if (!token) throw CustomError.internalServer("Error while creating JWT");

			const { password, email,...userEntity } = UserEntity.fromObject(user);

			return {
				user:userEntity,
				token
			};
		} catch (error) {
			throw CustomError.internalServer(`${error}`);
		}
	}
}
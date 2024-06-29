import { Validators } from "../../../config/validations";

export class RegisterUserDto {
	constructor(
		public readonly username: string,
		public readonly email: string, 
		public readonly password: string
	) {}


	public static create(object: {[key: string]: any}): [string?, RegisterUserDto?] {
		
		const {username,email,password} = object;

		if(!username) return ['Username is required']
		if(!email) return ['Email is required']
		if(!Validators.isEmail(email)) return ['Email is invalid']
		if(!password) return ['Password is required']
		if(password.length < 6) return ['Password is invalid']

		return [undefined, new RegisterUserDto(username,email, password)];
	}
}
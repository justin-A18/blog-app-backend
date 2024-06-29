import { Validators } from "../../../config/validations";

export class LoginUserDto {
	constructor(
		public readonly email: string, 
		public readonly password: string
	) {}


	public static create(object: {[key: string]: any}): [string?, LoginUserDto?] {
		
		const {email,password} = object;

		if(!email) return ['Email is required']
		if(!Validators.isEmail(email)) return ['Email is invalid']
		if(!password) return ['Password is required']
		if(password.length < 6) return ['Password is invalid']

		return [undefined, new LoginUserDto(email, password)];
	}
}
export class UpdateUserDto {

	constructor(
		public readonly username: string,
	){}

	static create(object: {[key: string]:any}): [string?,UpdateUserDto?] {
		const {username} = object;

		if(!username) return ['Username is required'];
		
		return [undefined, new UpdateUserDto(username)];
	}

}
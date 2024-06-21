import {compareSync, genSaltSync, hashSync} from 'bcryptjs'
export class BcryptAdapter {
	public static hash(password: string,saltNumber: number = 10): string{
		const salt = genSaltSync(saltNumber);

		return hashSync(password,salt);
	}

	public static compare(password: string, hash: string): boolean{
		return compareSync(password, hash);
	}
}
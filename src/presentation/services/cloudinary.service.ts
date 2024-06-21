import { v2 as cloudinary } from 'cloudinary'
import { envs } from '../../config/envs';
import { CustomError } from '../../domain/errors';

cloudinary.config({
	cloud_name: envs.CLOUDINARY_CLOUD_NAME,
	api_key: envs.CLOUDINARY_API_KEY,
	api_secret: envs.CLOUDINARY_API_SECRET,
	secure: true
});

export class CloudinaryService {
	public async updateImage(image: any) {
		try {
			const { secure_url } = await cloudinary.uploader.upload(image);
			return secure_url;
		} catch (error) {
			throw CustomError.internalServer(`${error}`);	
		}
	}

	public async deleteImage(image: string) {
		try {
			const nombreArr = image.split('/');
			const nombre = nombreArr[nombreArr.length - 1];
			const [public_id] = nombre.split('.');

			await cloudinary.uploader.destroy(public_id);
		} catch (error) {
			throw CustomError.internalServer(`${error}`);	
		}
	}
}
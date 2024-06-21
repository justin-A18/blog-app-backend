import { BlogModel } from "../../database"
import { CreateBlogDto, UpdateBlogDto } from "../../domain/dto/blogs";
import { BlogEntity } from "../../domain/entities";
import { CustomError } from "../../domain/errors";
import { CloudinaryService } from "./cloudinary.service";

export class BlogService {

	constructor(
		private cloudinaryService: CloudinaryService = new CloudinaryService()
	){}

	public async getAllBlogs (limit: number = 5, per_page: number = 0) {
		try {
			const [total,blogs] = await Promise.all([
				BlogModel.countDocuments(),
				BlogModel.find()
				.populate({path: 'user',select: 'username'})
				.populate("category")
				.skip(Number(per_page))
				.limit(Number(limit)),
			])
	
			return {
				total,
				blogs,
			}
		} catch (error) {
			throw CustomError.internalServer( `${ error }` );
		}
	}

	public async getBlogById(id: string) {
		try {
			const blog = await BlogModel.findById(id)
			.populate({path: 'user',select: 'username'})
			.populate("category");

			if(!blog) throw CustomError.badRequest('Blog not found with this id');

			return {
				blog
			}
		} catch (error) {
			throw CustomError.internalServer( `${ error }` );
		}
	}

	public async createBlog(createBlogDto: CreateBlogDto){
		try {
			const blog = await BlogModel.create(createBlogDto);
			
			if(blog.image){
				blog.image = await this.cloudinaryService.updateImage(createBlogDto.image);
			}

			blog.save();

			const blogEntity = BlogEntity.fromObject(blog);

			return {
				blog: blogEntity
			}
		} catch (error) {
			console.log(error);
			throw CustomError.internalServer(`${ error }`);
		}
	}

	public async updateBlog(id: string,updateBlogDto: UpdateBlogDto){
		try {
			const blogExists = await BlogModel.findById(id);
			if(!blogExists) throw CustomError.badRequest('Blog not found with this id');

			const updateImage = await this.cloudinaryService.updateImage(updateBlogDto.image);

			//eliminar la imagen anterior
			await this.cloudinaryService.deleteImage(blogExists.image!);

			const blog = await BlogModel.findByIdAndUpdate(id, {
				...updateBlogDto,
				image: updateImage
			},{
				new: true
			});
		
			const blogEntity = BlogEntity.fromObject(blog!);

			return{
				blog: blogEntity
			}
		} catch (error) {
			throw CustomError.internalServer(`${error}`);	
		}
	}

	public async deleteBlog(id: string){
		try {
			const blogExists = await BlogModel.findById(id);
			if(!blogExists) throw CustomError.badRequest('Blog not found with this id');

			//Eliminar imagen decloudinary
			await this.cloudinaryService.deleteImage(blogExists.image!);

			const blog = await BlogModel.findByIdAndDelete(id);

			const blogEntity = BlogEntity.fromObject(blog!);

			return {
				blog: blogEntity
			}
		} catch (error) {
			throw CustomError.internalServer(`${error}`);	
		}
	}
}
import { CategoryModel } from "../../database"

export class CategoryService {
	public async getAllCategories (limit: number = 5, per_page: number = 0) {
		const [total,categories] = await Promise.all([
			CategoryModel.countDocuments(),
			CategoryModel.find()
			.skip(Number(per_page))
			.limit(Number(limit)),
		])

		return {
			total,
			categories,
		}
	}
}
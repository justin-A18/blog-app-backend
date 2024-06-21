import { Schema, model } from 'mongoose';

const categorySchema = new Schema({
	name: {
		type: String, 
		required: [true, 'name is required'],
		unique: [true, 'name must be unique'],
	 }
});

categorySchema.set('toJSON', {
	virtuals: true,
	versionKey: false,
	transform: function (_, ret) {
		delete ret._id;
	},
});

export const CategoryModel = model('Categories', categorySchema);
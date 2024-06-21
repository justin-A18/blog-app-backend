import { Schema, model } from 'mongoose';

const blogSchema = new Schema({
	title: {
		type: String, 
		required: [true, 'title is required'],
	 },
	description: {
		type: String,
		require: [true, 'description is required']
	},
	image: {
		type: String,
	},
	category: {
		type: Schema.Types.ObjectId,
		ref: "Categories",
		require: [true, 'category is required']
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: "Users",
		require: [true, 'user is required']
	},
	createAt: {
		type: Date,
		default: Date.now
	}
});

blogSchema.set('toJSON', {
	virtuals: true,
	versionKey: false,
	transform: function (_, ret) {
		delete ret._id;
	},
});

export const BlogModel = model('Blogs', blogSchema);
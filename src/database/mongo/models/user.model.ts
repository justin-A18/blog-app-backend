import { Schema, model } from 'mongoose';

const userSchema = new Schema({
	username: { type: String, required: [true, 'username is required'] },
	email: { type: String, required: [true, 'email is required'], unique: true },
	password: { type: String, required: [true, 'password is required'] },
	avatar: { type: String }
});

userSchema.set('toJSON', {
	virtuals: true,
	versionKey: false,
	transform: function (_, ret) {
		delete ret._id;
		delete ret.password;
	},
});

export const UserModel = model('Users', userSchema);
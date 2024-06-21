import mongoose from "mongoose";

interface Options {
  mongoUrl: string;
  dbName: string;
}

export class MongoDataBase {
	static async connect(option:Options){
		try {
			const { mongoUrl,dbName } = option
		
			await mongoose.connect(mongoUrl, {
				dbName
			})

			console.log('Mongo connected 💯');

			return true
		} catch (error) {
			console.log("Mongo connection error ❌");
      throw error;
		}
	}
}
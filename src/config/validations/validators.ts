import mongoose from "mongoose";
import { regularExps } from "./regular-exp";

export class Validators {
  static isMongoID(id: string) {
    return mongoose.isValidObjectId(id);
  }

  static mongoId(id: string) {
    return new mongoose.Types.ObjectId(id);
  }

	static isEmail(email: string) {
		return regularExps.email.test(email);
	}

	static isPasswordValid(password: string) {
		return regularExps.password.test(password);
	}

  static startDay(date: Date) {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    
    return startOfDay;
  }
}
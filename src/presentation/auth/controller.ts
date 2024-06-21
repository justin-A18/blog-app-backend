import { Request, Response } from "express";
import { LoginUserDto, RegisterUserDto } from "../../domain/dto/auth";
import { ErrorHandler } from "../../domain/errors";
import { AuthService } from "../services";

export class AuthController{

	constructor(private authService: AuthService) {}

	registerUser = (req: Request,res: Response) => {
		const [error,registerUserDto] = RegisterUserDto.create(req.body);

		if(error) return res.status(400).json({ error });

		this.authService.register(registerUserDto!)
			.then(user => res.status(201).json(user))
			.catch(error => ErrorHandler.handle(error,res));
	}

	loginUser = (req: Request,res: Response) => {
		const [error,loginUserDto] = LoginUserDto.create(req.body);
		if(error) return res.status(400).json({ error });

		this.authService.login(loginUserDto!)
			.then(user => res.status(200).json(user))
			.catch(error => ErrorHandler.handle(error,res));
	}
}
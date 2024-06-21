import { NextFunction,Request,Response } from 'express';
import { JwtAdapter } from '../../config/adapters';
import { UserEntity } from '../../domain/entities';
import { UserModel } from '../../database';

export class AuthMiddleware {
	public static async verifyToken(req: Request, res: Response, next: NextFunction) {
		try {
			const authorization = req.header('Authorization');

			if (!authorization)
				return res.status(401).json({ error: 'No token provided' });

			if (!authorization.startsWith('Bearer '))
				return res.status(401).json({ error: 'Invalid Bearer token' });

			const token = authorization.split(' ').at(1) || '';

			const payload = await JwtAdapter.validateToken<{ userId: string }>(token);
			if (!payload) return res.status(401).json({ error: 'Invalid token' });

			const user = await UserModel.findById(payload.userId);
			if (!user) return res.status(401).json({ error: 'Invalid token - user' });

      req.body.user = UserEntity.fromObject(user).id;

			next();
			
		} catch (err) {
			console.log(err);
      res.status(500).json({ error: "Internal server error" });
		}
	}
}
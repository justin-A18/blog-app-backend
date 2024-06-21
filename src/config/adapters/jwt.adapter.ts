import { sign, verify } from 'jsonwebtoken';
import { envs } from '../envs';

export class JwtAdapter {
    static generateJwt(payload: object, duration: string = '2h'): Promise<string | null> {
        return new Promise((resolve) => {
            sign(payload, envs.JWT_SECRET, {
                expiresIn: duration
            }, (err, token) => {
                if (err) {
                    return resolve(null);
                }
                return resolve(token!);
            });
        });
    }

    static validateToken<T>(token: string): Promise<T | null> {
        return new Promise((resolve) => {
            verify(token, envs.JWT_SECRET, (err, decoded) => {
                if (err) {
                    return resolve(null);
                }
                resolve(decoded as T);
            });
        });
    }
}

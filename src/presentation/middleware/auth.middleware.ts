import { NextFunction, Request, Response } from "express";
import { JwtAdapter } from "../../config/jwt.adapter";


export class AuthMiddleware {


    static async validateToken( req: Request, res: Response, next: NextFunction) {

        let { token } = req.cookies
        if(!token) return res.status(401).json('User without authorization');

        try {

            const payload = await JwtAdapter.validateToken<{id: number}>(token)
            if(!payload) return res.status(401).json({ error: 'Invalid token' });


            if(!payload.id) return res.status(401).json('User without authorization');

            next();

        } catch (error) {
            console.error(error)
            res.status(500).json({ error: 'Internal server error' })
        }


    }

}

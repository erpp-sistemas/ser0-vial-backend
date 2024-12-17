import { Request, Response } from "express";
import { LoginDto } from "../../domain";
import { AccessRepository } from "../../domain/repositories/access.repository";
import { Login } from '../../domain/uses-cases/auth';

export class AuthController {

    // * DI
    constructor(
        public accessRepository: AccessRepository
    ) { }


    login = (req: Request, res: Response) => {

        const [error, loginDto] = LoginDto.create(req.body)
        if (error) return res.status(400).json({ error });

        // * llamar al service -> mas sencillo

        // * llamar al caso de uso -> clean architecture
        new Login(this.accessRepository).execute(loginDto!)
            .then(access => {
                let { token, ...user_info } = access
                res.cookie('token', token, {
                    httpOnly: true, // For security reasons, set HttpOnly to true
                    secure: true,
                    sameSite: 'none', // Helps with CSRF protection
                });
                res.json(user_info)
            }).catch(error => res.status(400).json({ error }))

    }
}
import { Request, Response } from "express";
import { RouteUserRepository } from "../../domain/repositories/route-user.repository";
import { GetByUserDates, InsertRouteUser } from '../../domain/uses-cases/route-user';
import { InsertRouteUserDto } from "../../domain/dtos/route-user/insert-route.dto";


export class RouteUserController {

    constructor(
        private repository: RouteUserRepository
    ){}

    getByUserAndDates = (req: Request, res: Response) => {
        const { user_id, date_init, date_end } = req.params;
        new GetByUserDates(this.repository).execute(Number(user_id), date_init, date_end)
            .then(routes => res.status(200).json(routes))
            .catch(error => res.status(400).json(error))
    }

    insertRouteUser = (req: Request, res: Response) => {
        const [error, dto] = InsertRouteUserDto.create(req.body);
        if(error) return res.status(400).json({ error });

        new InsertRouteUser(this.repository).execute(dto!)
            .then( route => res.status(200).json(route) )
            .catch(error => res.status(400).json(error))
    }

}
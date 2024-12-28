import { Request, Response } from "express";
import { MenuRepository } from "../../domain/repositories/menu.repository";
import { getByUser } from '../../domain/uses-cases/menu/get-by-user'



export class MenuController {

    constructor(
        private menuRepository: MenuRepository
    ){}


    getByUser = (req: Request, res: Response) => {

        let { id_user } = req.params

        new getByUser(this.menuRepository).execute(Number(id_user))
            .then( menus => res.json(menus))
            .catch(error => res.status(400).json({ error }))

    }

}
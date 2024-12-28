import { Router } from "express";
import { MenuDatasourceImpl } from "../../infrastructure/datasource/menu.datasource.impl";
import { MenuRepositoryImpl } from "../../infrastructure/repositories/menu.repository.impl";
import { MenuController } from "./controller";
import { AuthMiddleware } from '../middleware/auth.middleware'



export class MenuRoutes {

    static get routes(): Router {
        
        const router = Router();

        const datasource = new MenuDatasourceImpl();
        const menuRepository = new MenuRepositoryImpl(datasource)
        const menuController = new MenuController(menuRepository)

        // router.get('/get-by-user/:id_user', AuthMiddleware.validateToken, menuController.getByUser)
        router.get('/get-by-user/:id_user', menuController.getByUser)

        return router

    }

}
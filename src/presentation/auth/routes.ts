import { Router } from "express";
import { AccessDatasourceImpl } from "../../infrastructure/datasource/access.datasource.impl";
import { AccessRepositoryImpl } from "../../infrastructure/repositories/access.repository.impl";
import { AuthController } from "./controller";

export class AuthRoutes {

    static get routes(): Router {

        const router = Router();

        // todo implementar datasource y repository
        const datasource = new AccessDatasourceImpl();
        const accessRepository = new AccessRepositoryImpl(datasource)
        const userController = new AuthController(accessRepository)    
        
        router.post('/login', userController.login)

        return router;

    }

}
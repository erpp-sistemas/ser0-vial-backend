import { Router } from "express";
import { StackUserDatasourceImpl } from "../../infrastructure/datasource/stack-user.datasource.impl";
import { StackUserRepositoryImpl } from "../../infrastructure/repositories/stack-user.repository.impl";
import { StackUserController } from "./controller";


export class StackUserRoutes {

    static get routes(): Router {

        const router = Router();

        const datasource = new StackUserDatasourceImpl();
        const repository = new StackUserRepositoryImpl(datasource);
        const controller = new StackUserController(repository);

        router.post('/insert-stack-user', controller.insertPercentage)

        return router;

    }

}
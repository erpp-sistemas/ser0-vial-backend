import { Router } from "express";
import { RouteUserDatasourceImpl } from "../../infrastructure/datasource/route-user.datasource.impl";
import { RouteUserRepositoryImpl } from "../../infrastructure/repositories/route-user.repository.impl";
import { RouteUserController } from "./controller";


export class RouteUserRoutes {

    static get routes(): Router {

        const router = Router();

        const datasource = new RouteUserDatasourceImpl();
        const repository = new RouteUserRepositoryImpl(datasource);
        const controller = new RouteUserController(repository);

        router.get('/get-by-user-dates/:user_id/:date_init/:date_end', controller.getByUserAndDates)
        router.post('/insert', controller.insertRouteUser)

        return router;
    }

}
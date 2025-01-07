import { Router } from "express";
import { FormDatasourceImpl } from "../../infrastructure/datasource/form.datasource.impl";
import { FormRepositoryImpl } from "../../infrastructure/repositories/form.repository.impl";
import { FormController } from "./controller";


export class FormRoutes {

    static get routes(): Router {

        const router = Router();

        const dataource = new FormDatasourceImpl();
        const repository = new FormRepositoryImpl(dataource);
        const controller = new FormController(repository);


        router.get('/get-all', controller.getAllForms);
        router.get('/get-by-place/:place_id', controller.getFormsByPlace)

        return router;

    }


}
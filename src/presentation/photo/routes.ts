import { Router } from "express";
import { PhotoDatasourceImpl } from "../../infrastructure/datasource/photo.datasource.impl";
import { PhotoRepositoryImpl } from "../../infrastructure/repositories/photo.repository.impl";
import { PhotoController } from "./controller";


export class PhotoRoutes {

    static get routes(): Router {

        const router = Router();

        const datasource = new PhotoDatasourceImpl();
        const repository = new PhotoRepositoryImpl(datasource);
        const controller = new PhotoController(repository);

        router.post('/insert-photo', controller.insertPhoto)

        return router;

    }

}
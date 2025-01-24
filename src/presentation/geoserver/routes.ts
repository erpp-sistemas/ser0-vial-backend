import { Router } from "express";
import { GeoserverDatasourceImpl } from "../../infrastructure/datasource/geoserver.datasource.impl";
import { GeoserverRepositoryImpl } from "../../infrastructure/repositories/geoserver.repository.impl";
import { GeoserverController } from "./controller";



export class GeoserverRoutes {

    static get routes(): Router {

        const router = Router();

        const datasource = new GeoserverDatasourceImpl();
        const repository = new GeoserverRepositoryImpl(datasource);
        const controller = new GeoserverController(repository);

        router.post('/get-data-url', controller.getDataByUrl);

        return router;

    }
    
}
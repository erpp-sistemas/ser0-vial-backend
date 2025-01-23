import { Router } from "express"
import { LayerDatasourceImpl } from "../../infrastructure/datasource/layer.datasource.impl";
import { LayerRepositoryImpl } from "../../infrastructure/repositories/layer.repository.impl";
import { LayerController } from "./controller";


export class LayerRoutes {

    static get routes(): Router {

        const router = Router();

        const datasource = new LayerDatasourceImpl();
        const repository = new LayerRepositoryImpl(datasource);
        const controller = new LayerController(repository);

        router.get('/get-by-place/:place_id', controller.getByPlace);

        return router;  

    }

}
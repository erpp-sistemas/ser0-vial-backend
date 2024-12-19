import { Router } from "express";
import { UserDatasourceImpl } from "../../infrastructure/datasource/user.datasource.impl";
import { UserRepositoryImpl } from "../../infrastructure/repositories/user.repository.impl";
import { UserController } from "./controller";



export class UserRoutes {

    static get routes(): Router {

        const router = Router();

        const datasource = new UserDatasourceImpl();
        const repository = new UserRepositoryImpl(datasource);
        const controller = new UserController(repository);


        router.get('/get-all', controller.getAll)
        router.get('/get-by-id/:user_id', controller.getById)
        router.get('/get-by-place/:place_id', controller.getByPlace)
        
        router.post('/create', controller.createUser)
        router.delete('/delete-by-id', controller.deleteUser)
        router.put('/update-by-id', controller.updateUser)

        return router;

    }

}
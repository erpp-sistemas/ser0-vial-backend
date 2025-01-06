import { Router } from 'express'
import { AuthRoutes } from './auth/routes'
import { UserRoutes } from './user/routes';
import { MenuRoutes } from './menu/routes';
import { AttendanceRoutes } from './attendance/routes';
import { FormRoutes } from './form/routes';
import { RegisterRoutes } from './register/routes';

export class AppRoutes {

    static get routes(): Router {

        const router = Router();     
        
        router.use('/api/auth', AuthRoutes.routes)
        router.use('/api/user', UserRoutes.routes)
        router.use('/api/menu', MenuRoutes.routes)
        router.use('/api/attendance', AttendanceRoutes.routes)
        router.use('/api/form', FormRoutes.routes)
        router.use('/api/register', RegisterRoutes.routes)

        return router;

    }

}

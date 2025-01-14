import { prisma } from "../../data/sqlserver";
import { RouteUserDatasource } from "../../domain/datasources/route-user.datasource";
import { InsertRouteUserDto } from "../../domain/dtos/route-user/insert-route.dto";
import { RouteUserEntity } from "../../domain/entities/route-user.entity";


export class RouteUserDatasourceImpl extends RouteUserDatasource {

    async getByUserAndDates(user_id: number, date_init: string, date_end: string): Promise<RouteUserEntity[]> {
        const dateStart = new Date(date_init);
        const dateEnd = new Date(date_end);
        const routes = await prisma.route_user.findMany({
            where: {
                user_id: user_id,
                created_at: {
                    gte: new Date(dateStart.toISOString().split('T')[0] + 'T00:00:00Z'), // Inicio del día
                    lte: new Date(dateEnd.toISOString().split('T')[0] + 'T23:59:59Z'), // Fin del día
                },
            },
            include: { user: true }
        });
        return routes.map(route => RouteUserEntity.fromObject(route));
    }

    async insert(insertRouteDto: InsertRouteUserDto): Promise<RouteUserEntity> {

        const new_route = await prisma.route_user.create({
            data: insertRouteDto
        })

        return RouteUserEntity.fromObject(new_route);
    }


}
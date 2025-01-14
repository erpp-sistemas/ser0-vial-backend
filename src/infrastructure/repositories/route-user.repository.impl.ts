import { RouteUserDatasource } from "../../domain/datasources/route-user.datasource";
import { InsertRouteUserDto } from "../../domain/dtos/route-user/insert-route.dto";
import { RouteUserEntity } from "../../domain/entities/route-user.entity";
import { RouteUserRepository } from "../../domain/repositories/route-user.repository";


export class RouteUserRepositoryImpl extends RouteUserRepository {
    
    constructor(
        private datasource: RouteUserDatasource
    ){super();}

    getByUserAndDates(user_id: number, date_init: string, date_end: string): Promise<RouteUserEntity[]> {
        return this.datasource.getByUserAndDates(user_id, date_init, date_end);
    }

    insert(insertRouteDto: InsertRouteUserDto): Promise<RouteUserEntity> {
        return this.datasource.insert(insertRouteDto);
    }

}
import { InsertRouteUserDto } from "../dtos/route-user/insert-route.dto";
import { RouteUserEntity } from "../entities/route-user.entity";


export abstract class RouteUserDatasource {

    abstract getByUserAndDates(user_id: number, date_init: string, date_end: string):Promise<RouteUserEntity[]>;
    abstract insert(insertRouteDto: InsertRouteUserDto): Promise<RouteUserEntity>;

}
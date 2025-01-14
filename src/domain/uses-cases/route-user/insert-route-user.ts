import { InsertRouteUserDto } from "../../dtos/route-user/insert-route.dto";
import { RouteUserEntity } from "../../entities/route-user.entity";
import { RouteUserRepository } from "../../repositories/route-user.repository";

interface InsertRouteUserUseCase {
    execute(insertRouteDto: InsertRouteUserDto): Promise<RouteUserEntity>
}

export class InsertRouteUser implements InsertRouteUserUseCase {

    constructor(
        private repository: RouteUserRepository
    ) { }

    execute(insertRouteDto: InsertRouteUserDto): Promise<RouteUserEntity> {
        return this.repository.insert(insertRouteDto);
    }


}
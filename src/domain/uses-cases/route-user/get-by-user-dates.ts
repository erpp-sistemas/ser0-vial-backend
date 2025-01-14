import { RouteUserEntity } from "../../entities/route-user.entity";
import { RouteUserRepository } from "../../repositories/route-user.repository";

interface GetByUserDatesUseCase {
    execute(user_id: number, date_init: string, date_end: string): Promise<RouteUserEntity[]>
}

export class GetByUserDates implements GetByUserDatesUseCase {

    constructor(
        private repository: RouteUserRepository
    ){}


    execute(user_id: number, date_init: string, date_end: string): Promise<RouteUserEntity[]> {
        return this.repository.getByUserAndDates(user_id, date_init, date_end);
    }

}
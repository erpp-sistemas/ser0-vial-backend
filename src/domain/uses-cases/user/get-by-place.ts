import { UserEntity } from "../../entities/user.entity";
import { UserRepository } from "../../repositories/user.repository";


interface GetByPlaceUseCase {
    execute(place_id: number): Promise<UserEntity[]>
}


export class GetUsersByPlace implements GetByPlaceUseCase {

    constructor(
        private repository: UserRepository
    ){}

    execute(place_id: number): Promise<UserEntity[]> {
        return this.repository.getByPlaceId(place_id);
    }

}

import { UserEntity } from "../../entities/user.entity";
import { UserRepository } from "../../repositories/user.repository";


interface UpdateByIdUseCase {
    execute(user_id: number, data: any): Promise<UserEntity>
}


export class UpdateUserById implements UpdateByIdUseCase {

    constructor(
        private repository: UserRepository
    ){}


    execute(user_id: number, data: any): Promise<UserEntity> {
        return this.repository.update(user_id, data)
    }

}
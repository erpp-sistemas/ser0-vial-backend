import { UserEntity } from "../../entities/user.entity";
import { UserRepository } from "../../repositories/user.repository";


interface DeleteByIdUseCase {
    execute(user_id: number): Promise<UserEntity>
}


export class DeleteUserById implements DeleteByIdUseCase {

    constructor(
        private repository: UserRepository
    ){}

    execute(user_id: number): Promise<UserEntity> {
        return this.repository.delete(user_id);
    }

}
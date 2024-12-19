import { UserEntity } from "../../entities/user.entity";
import { UserRepository } from "../../repositories/user.repository";


interface GetByIdUseCase {
    execute( user_id: number ): Promise<UserEntity>
}


export class GetUserById implements GetByIdUseCase {
    
    constructor(
        private repository: UserRepository
    ) {}

    execute(user_id: number): Promise<UserEntity> {
        return this.repository.getById(user_id);
    }
}
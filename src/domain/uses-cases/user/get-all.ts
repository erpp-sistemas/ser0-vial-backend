import { UserEntity } from "../../entities/user.entity";
import { UserRepository } from "../../repositories/user.repository";


interface GetAllUseCase {
    execute(): Promise<UserEntity[]>
}

export class GetAllUsers implements GetAllUseCase {

    constructor(
        private repository: UserRepository
    ){}

    execute(): Promise<UserEntity[]> {
        return this.repository.getAll();
    }

}
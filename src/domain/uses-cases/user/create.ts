import { CreateUserDto } from "../../dtos";
import { UserEntity } from "../../entities/user.entity";
import { UserRepository } from "../../repositories/user.repository";


interface CreateUseCase {
    execute(userDto: CreateUserDto): Promise<UserEntity>
}

export class CreateUser implements CreateUseCase {
    
    constructor(
        private repository: UserRepository
    ) {}

    execute(userDto: CreateUserDto): Promise<UserEntity> {
        return this.repository.create(userDto);
    }

}
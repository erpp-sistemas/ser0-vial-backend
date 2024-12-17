import { LoginDto } from "../../dtos";
import { AccessEntity } from "../../entities/access.entity";
import { AccessRepository } from "../../repositories/access.repository";



interface LoginUseCase {
    execute( dto: LoginDto ): Promise<AccessEntity>
}

export class Login implements LoginUseCase {
    
    constructor(
        private readonly accessRepository: AccessRepository
    ){}

    execute(dto: LoginDto): Promise<AccessEntity> {
        return this.accessRepository.login(dto)
    }

}
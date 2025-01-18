import { InsertPercentageDto } from "../../dtos/stack_user/insert-percentage.dto";
import { StackUserEntity } from "../../entities/stack-user.entity";
import { StackUserRepository } from "../../repositories/stack-user.repository";


interface insertPercentageUseCase {
    execute(dto: InsertPercentageDto): Promise<StackUserEntity>
}

export class InsertPercentage implements insertPercentageUseCase {
    
    constructor(
        private repository: StackUserRepository
    ){}

    execute(dto: InsertPercentageDto): Promise<StackUserEntity> {
        return this.repository.insertPercentage(dto);
    }

}
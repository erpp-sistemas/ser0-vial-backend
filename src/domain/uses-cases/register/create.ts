import { InsertRegisterDto } from "../../dtos";
import { RegisterEntity } from "../../entities/register.entity";
import { RegisterRepository } from "../../repositories/register.repository";

interface CreateRegisterUseCase {
  execute(dto: InsertRegisterDto): Promise<RegisterEntity>;
}

export class CreateRegister implements CreateRegisterUseCase {
  constructor(private readonly registerRepository: RegisterRepository) {}

  execute(dto: InsertRegisterDto): Promise<RegisterEntity> {
    return this.registerRepository.create(dto);
  }
}

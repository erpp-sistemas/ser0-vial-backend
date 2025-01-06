import { RegisterDto } from "../../dtos";
import { RegisterEntity } from "../../entities/register.entity";
import { RegisterRepository } from "../../repositories/register.repository";

interface GetByDatesUseCase {
  execute(dto: RegisterDto): Promise<RegisterEntity[]>;
}

export class GetByDates implements GetByDatesUseCase {
  constructor(private readonly registerRepository: RegisterRepository) {}

  execute(dto: RegisterDto): Promise<RegisterEntity[]> {
    return this.registerRepository.getByDates(dto);
  }
}

import { RegisterDto } from "../dtos";
import { RegisterEntity } from "../entities/register.entity";

export abstract class RegisterDatasource {
  abstract getByDates(registerDto: RegisterDto): Promise<RegisterEntity[]>;
}

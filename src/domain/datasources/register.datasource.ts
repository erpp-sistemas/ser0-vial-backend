import { RegisterDto, InsertRegisterDto } from "../dtos";
import { RegisterEntity } from "../entities/register.entity";

export abstract class RegisterDatasource {
  abstract getByDates(registerDto: RegisterDto): Promise<RegisterEntity[]>;
  abstract create(insertRegisterDto: InsertRegisterDto): Promise<RegisterEntity>;
}

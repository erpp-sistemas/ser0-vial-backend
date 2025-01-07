import { InsertRegisterDto, RegisterDto } from "../dtos";
import { RegisterEntity } from "../entities/register.entity";

export abstract class RegisterRepository {
  abstract getByDates(registerDto: RegisterDto): Promise<RegisterEntity[]>;
  abstract create(insertRegisterDto: InsertRegisterDto): Promise<RegisterEntity>;
}

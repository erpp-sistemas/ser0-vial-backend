import { InsertRegisterDto, RegisterDto } from "../../domain";
import { RegisterDatasource } from "../../domain/datasources/register.datasource";
import { RegisterRepository } from "../../domain/repositories/register.repository";
import { RegisterEntity } from "../../domain/entities/register.entity";

export class RegisterRepositoryImpl implements RegisterRepository {
  constructor(public datasource: RegisterDatasource) {}
  
  
  create(insertRegisterDto: InsertRegisterDto): Promise<RegisterEntity> {
    return this.datasource.create(insertRegisterDto);
  }

  getByDates(registerDto: RegisterDto): Promise<RegisterEntity[]> {
    return this.datasource.getByDates(registerDto);
  }
}

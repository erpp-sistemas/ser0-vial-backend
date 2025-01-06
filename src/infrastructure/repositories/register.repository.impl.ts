import { RegisterDto } from "../../domain";
import { RegisterDatasource } from "../../domain/datasources/register.datasource";
import { RegisterRepository } from "../../domain/repositories/register.repository";
import { RegisterEntity } from "../../domain/entities/register.entity";

export class RegisterRepositoryImpl implements RegisterRepository {
  constructor(public datasource: RegisterDatasource) {}

  getByDates(registerDto: RegisterDto): Promise<RegisterEntity[]> {
    return this.datasource.getByDates(registerDto);
  }
}

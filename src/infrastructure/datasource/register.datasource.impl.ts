import { prisma } from "../../data/sqlserver";
import { RegisterDto, CustomError, InsertRegisterDto } from "../../domain";
import { RegisterDatasource } from "../../domain/datasources/register.datasource";
import { RegisterEntity } from "../../domain/entities/register.entity";

export class RegisterDatasourceImpl implements RegisterDatasource {
  
  
  async create(insertRegisterDto: InsertRegisterDto): Promise<RegisterEntity> {
    try {
      const { user_id, data_json, form_id, latitude, longitude, place_id, registration_date } = insertRegisterDto;
      const new_register = await prisma.register_form_dynamic.create({
        data: insertRegisterDto
      })
      return RegisterEntity.fromObject(new_register)
    } catch (error) {
      console.error(error);
      throw CustomError.internalServer("Internal server error");
    }
  }


  async getByDates(registerDto: RegisterDto): Promise<RegisterEntity[]> {
    try {
      const { place_id, form_id, date_init, date_end } = registerDto;
      const startDate = new Date(date_init).toISOString();
      const endDate = new Date(date_end).toISOString();

      const registers: any[] = await prisma.register_form_dynamic.findMany({
        where: {
          form_id: form_id,
          place_id: place_id,
          registration_date: {
            gte: startDate, // Fecha inicial (>=)
            lte: endDate, // Fecha final (<=)
          },
        },
        include: {
          place: true, // Incluir relación con `place`
          form: true, // Incluir relación con `form`
          user: true, // Incluir relación con `user`
        },
      });
      return registers.map((attendance) =>
        RegisterEntity.fromObject(attendance)
      );
    } catch (error) {
      console.error(error);
      throw CustomError.internalServer("Internal server error");
    }
  }
}

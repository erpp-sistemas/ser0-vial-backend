import { prisma } from "../../data/sqlserver";
import { RegisterDto, CustomError } from "../../domain";
import { RegisterDatasource } from "../../domain/datasources/register.datasource";
import { RegisterEntity } from "../../domain/entities/register.entity";

export class RegisterDatasourceImpl implements RegisterDatasource {
  async getByDates(registerDto: RegisterDto): Promise<RegisterEntity[]> {
    try {
      const { form_id, date_init, date_end } = registerDto;
      const startDate = new Date(date_init).toISOString();
      const endDate = new Date(date_end).toISOString();

      const registers: any[] = await prisma.register_form_dynamic.findMany({
        where: {
          form_id: form_id,
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

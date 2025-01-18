import { prisma } from "../../data/sqlserver";
import { CustomError } from "../../domain";
import { StackUserDatasource } from "../../domain/datasources/stack-user.datasource";
import { InsertPercentageDto } from "../../domain/dtos/stack_user/insert-percentage.dto";
import { StackUserEntity } from "../../domain/entities/stack-user.entity";


export class StackUserDatasourceImpl extends StackUserDatasource {

    async insertPercentage(dto: InsertPercentageDto): Promise<StackUserEntity> {
        try {
            const new_data = await prisma.stack_user.create({
                data: dto
            })
            return StackUserEntity.fromObject(new_data);
        } catch (error) {
            console.error(error);
            throw CustomError.internalServer("Internal server error");
        }
    }

    getByUserDates(user_id: number, date_init: string, date_end: string): Promise<StackUserEntity[]> {
        throw new Error("Method not implemented.");
    }

    getByDates(date_init: string, date_end: string): Promise<StackUserEntity[]> {
        throw new Error("Method not implemented.");
    }

}
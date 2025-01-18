import { StackUserDatasource } from "../../domain/datasources/stack-user.datasource";
import { InsertPercentageDto } from "../../domain/dtos/stack_user/insert-percentage.dto";
import { StackUserEntity } from "../../domain/entities/stack-user.entity";
import { StackUserRepository } from "../../domain/repositories/stack-user.repository";


export class StackUserRepositoryImpl extends StackUserRepository {
 
    constructor(
        private datasource: StackUserDatasource
    ){super();}

    insertPercentage(dto: InsertPercentageDto): Promise<StackUserEntity> {
        return this.datasource.insertPercentage(dto);
    }

    getByUserDates(user_id: number, date_init: string, date_end: string): Promise<StackUserEntity[]> {
        return this.datasource.getByUserDates(user_id, date_init, date_end);
    }

    getByDates(date_init: string, date_end: string): Promise<StackUserEntity[]> {
        return this.datasource.getByDates(date_init, date_end);
    }
 

}
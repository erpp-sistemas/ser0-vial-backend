import { InsertPercentageDto } from "../dtos/stack_user/insert-percentage.dto";
import { StackUserEntity } from "../entities/stack-user.entity";


export abstract class StackUserDatasource {

    abstract insertPercentage(dto: InsertPercentageDto): Promise<StackUserEntity>;
    abstract getByUserDates(user_id: number, date_init: string, date_end: string): Promise<StackUserEntity[]>;
    abstract getByDates(date_init: string, date_end: string): Promise<StackUserEntity[]>;

}
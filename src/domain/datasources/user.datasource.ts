import { UserEntity } from "../entities/user.entity";
import { CreateUserDto } from '../dtos';


export abstract class UserDatasource {
    abstract getAll(): Promise<UserEntity[]>;
    abstract getById(user_id: number): Promise<UserEntity>;
    abstract getByPlaceId(place_id: number): Promise<UserEntity[]>;
    abstract create(user: CreateUserDto): Promise<UserEntity>;
    abstract update(user_id: number, data: any): Promise<UserEntity>;
    abstract delete(user_id: number): Promise<UserEntity>;
}
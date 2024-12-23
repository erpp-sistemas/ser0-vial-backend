import { UserEntity } from "../entities/user.entity";
import { CreateUserDto } from '../dtos';


export abstract class UserRepository {
    abstract getAll(): Promise<UserEntity[]>;
    abstract getById(user_id: number): Promise<UserEntity>;
    abstract getByPlaceId(place_id: number): Promise<UserEntity[]>;
    abstract create(user: CreateUserDto): Promise<UserEntity>;
    abstract update(user_id: number, data: any): Promise<UserEntity>;
    abstract updateThemeColorByUserId(user_id: number, theme_color: string): Promise<string>;
    abstract delete(user_id: number): Promise<UserEntity>;
}
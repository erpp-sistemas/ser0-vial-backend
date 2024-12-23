import { CreateUserDto } from "../../domain";
import { UserDatasource } from "../../domain/datasources/user.datasource";
import { UserEntity } from "../../domain/entities/user.entity";
import { UserRepository } from "../../domain/repositories/user.repository";


export class UserRepositoryImpl extends UserRepository {
    
    constructor(
        private datasource: UserDatasource
    ){ super(); }

    
    getAll(): Promise<UserEntity[]> {
        return this.datasource.getAll();
    }
    getById(user_id: number): Promise<UserEntity> {
        return this.datasource.getById(user_id);
    }
    getByPlaceId(place_id: number): Promise<UserEntity[]> {
        return this.datasource.getByPlaceId(place_id);
    }
    create(user: CreateUserDto): Promise<UserEntity> {
        return this.datasource.create(user);
    }
    update(user_id: number, data: any): Promise<UserEntity> {
        return this.datasource.update(user_id, data);
    }
    delete(user_id: number): Promise<UserEntity> {
        return this.datasource.delete(user_id);
    }
    updateThemeColorByUserId(user_id: number, theme_color: string): Promise<string> {
        return this.datasource.updateThemeColorByUserId(user_id, theme_color);
    }

}
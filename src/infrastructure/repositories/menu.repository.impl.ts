import { MenuDatasource } from "../../domain/datasources/menu.datasource";
import { MenuEntity } from "../../domain/entities/menu.entity";
import { MenuRepository } from "../../domain/repositories/menu.repository";



export class MenuRepositoryImpl implements MenuRepository {


    constructor(
        private datasource: MenuDatasource
    ) {}

    
    getAll(): Promise<MenuEntity[]> {
        throw new Error("Method not implemented.");
    }

    getById(id: number): Promise<MenuEntity> {
        throw new Error("Method not implemented.");
    }

    getByUser(id_user: number): Promise<MenuEntity[]> {
        return this.datasource.getByUser(id_user)
    }

}
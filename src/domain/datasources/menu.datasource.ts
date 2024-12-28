import { MenuEntity } from "../entities/menu.entity";



export abstract class MenuDatasource {

    abstract getAll(): Promise<MenuEntity[]>
    abstract getById(id: number): Promise<MenuEntity>
    abstract getByUser(id_user: number): Promise<MenuEntity[]>
    
}
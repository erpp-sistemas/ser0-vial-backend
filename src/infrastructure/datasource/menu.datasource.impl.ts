import { prisma } from "../../data/sqlserver";
import { CustomError } from "../../domain";
import { MenuDatasource } from "../../domain/datasources/menu.datasource";
import { MenuEntity } from "../../domain/entities/menu.entity";



export class MenuDatasourceImpl implements MenuDatasource {

    getAll(): Promise<MenuEntity[]> {
        throw new Error("Method not implemented.");
    }

    getById(id: number): Promise<MenuEntity> {
        throw new Error("Method not implemented.");
    }

    async getByUser(id_user: number): Promise<MenuEntity[]> {

        try {
            const menus:any[] = await prisma.$queryRaw`EXEC sp_get_menus_by_user_id @id_user=${id_user}`
            return menus.map( menu => MenuEntity.fromObject(menu))
        } catch (error) {
            console.error(error)
            throw CustomError.internalServer('Internal server error')
        }

    }

}
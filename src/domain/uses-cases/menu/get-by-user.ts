import { MenuEntity } from "../../entities/menu.entity"
import { MenuRepository } from "../../repositories/menu.repository"


interface GetByUserUseCase {
    execute(id_user: number): Promise<MenuEntity[]>
}


export class getByUser implements GetByUserUseCase  {
    
    constructor(
        private readonly menuRepository: MenuRepository
    ){}

    execute(id_user: number): Promise<MenuEntity[]> {
        return this.menuRepository.getByUser(id_user)
    }

}
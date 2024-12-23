import { UserEntity } from "../../entities/user.entity";
import { UserRepository } from "../../repositories/user.repository";


interface UpdateThemeColorByUserIdUseCase {
    execute(user_id: number, theme_color: string): Promise<string>
}


export class UpdateThemeColorByUserId implements UpdateThemeColorByUserIdUseCase {

    constructor(
        private repository: UserRepository
    ){}


    execute(user_id: number, theme_color: string): Promise<string> {
        return this.repository.updateThemeColorByUserId(user_id, theme_color)
                               
    }

}
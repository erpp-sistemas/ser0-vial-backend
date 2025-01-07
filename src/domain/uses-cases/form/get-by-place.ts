import { FormEntity } from "../../entities/form.entity";
import { FormRepository } from "../../repositories/form.repository";

interface GetFormsByPlaceUseCase {
    execute(place_id: number): Promise<FormEntity[]>
}

export class GetFormsByPlace implements GetFormsByPlaceUseCase {
    
    constructor(
        private repository: FormRepository
    ) {}
    
    execute(place_id: number): Promise<FormEntity[]> {
        return this.repository.getByPlace(place_id);
    }

}
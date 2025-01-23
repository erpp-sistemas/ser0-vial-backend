import { FormEntity } from "../../entities/form.entity";
import { LayerEntity } from "../../entities/layer.entity";
import { LayerRepository } from "../../repositories/layer.repository";


interface GetByPlaceUseCase {
    execute(place_id: number): Promise<LayerEntity[]>;
}

export class GetByPlace implements GetByPlaceUseCase {

    constructor(
        private repository: LayerRepository
    ){}
    
    execute(place_id: number): Promise<LayerEntity[]> {
        return this.repository.getByPlace(place_id);
    }

}
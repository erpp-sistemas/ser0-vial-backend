import { LayerEntity } from "../entities/layer.entity";


export abstract class LayerRepository {

    abstract getAll(): Promise<LayerEntity[]>;
    abstract getById(layer_id: number): Promise<LayerEntity>;
    abstract getByPlace(place_id: number): Promise<LayerEntity[]>;

}
import { LayerDatasource } from "../../domain/datasources/layer.datasource";
import { LayerEntity } from "../../domain/entities/layer.entity";
import { LayerRepository } from "../../domain/repositories/layer.repository";


export class LayerRepositoryImpl extends LayerRepository {

    constructor(
        private datasource: LayerDatasource
    ){super();}

    getAll(): Promise<LayerEntity[]> {
        return this.datasource.getAll();
    }

    getById(layer_id: number): Promise<LayerEntity> {
        return this.datasource.getById(layer_id);
    }

    getByPlace(place_id: number): Promise<LayerEntity[]> {
        return this.datasource.getByPlace(place_id);
    }

}
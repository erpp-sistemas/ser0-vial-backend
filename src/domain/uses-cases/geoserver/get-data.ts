import { GeoserverEntity } from "../../entities/geoserver.entity";
import { GeoserverRepository } from "../../repositories/geoserver.repository";

interface GetDataUseCase {
    execute(url: string): Promise<GeoserverEntity>
}

export class GetData implements GetDataUseCase {

    constructor(
        private repository: GeoserverRepository
    ) {}

    execute(url: string): Promise<GeoserverEntity> {
        return this.repository.getGeoserverData(url);
    }


}
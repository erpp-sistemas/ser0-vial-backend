import { GeoserverDatasource } from "../../domain/datasources/geoserver.datasource";
import { GeoserverEntity } from "../../domain/entities/geoserver.entity";
import { GeoserverRepository } from "../../domain/repositories/geoserver.repository";


export class GeoserverRepositoryImpl extends GeoserverRepository {
    
    constructor(
        private datasource: GeoserverDatasource
    ) {super();}

    getGeoserverData(url: string): Promise<GeoserverEntity> {
        return this.datasource.getGeoserverData(url);
    }

}
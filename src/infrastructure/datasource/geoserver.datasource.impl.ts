import { CustomError } from "../../domain";
import { GeoserverDatasource } from "../../domain/datasources/geoserver.datasource";
import { GeoserverEntity } from "../../domain/entities/geoserver.entity";
import axios from "axios";

export class GeoserverDatasourceImpl extends GeoserverDatasource {

    async getGeoserverData(url: string): Promise<GeoserverEntity> {
        try {
            const data = (await axios.get(url)).data;
            return GeoserverEntity.fromObject(data)
        } catch (error) {
            console.error(error)
            throw CustomError.internalServer('Internal server error')
        }
    }

}
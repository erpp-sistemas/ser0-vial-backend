import { GeoserverEntity } from "../entities/geoserver.entity";


export abstract class GeoserverDatasource {

    abstract getGeoserverData(url: string): Promise<GeoserverEntity>;

}
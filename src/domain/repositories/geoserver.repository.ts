import { GeoserverEntity } from "../entities/geoserver.entity";


export abstract class GeoserverRepository {

    abstract getGeoserverData(url: string): Promise<GeoserverEntity>;

}
import { ServiceMap } from "../entities/service-map.entity";


export abstract class ServiceMapDatasource {

    abstract getById(service_id: number): Promise<ServiceMap>;
    abstract getAll(): Promise<ServiceMap[]>;
    abstract getByPlace(place_id: number): Promise<ServiceMap[]>

}
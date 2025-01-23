import { ServiceMapDatasource } from "../../domain/datasources/service-map.datasource";
import { ServiceMap } from "../../domain/entities/service-map.entity";
import { ServiceMapRepository } from "../../domain/repositories/service-map.repository";


export class ServiceMapRepositoryImpl extends ServiceMapRepository {

    constructor(
        private datasource: ServiceMapDatasource
    ) { super(); }

    getById(service_id: number): Promise<ServiceMap> {
        return this.datasource.getById(service_id);
    }

    getAll(): Promise<ServiceMap[]> {
        return this.datasource.getAll();
    }

    getByPlace(place_id: number): Promise<ServiceMap[]> {
        return this.datasource.getByPlace(place_id);
    }


}
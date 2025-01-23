import { prisma } from "../../data/sqlserver";
import { CustomError } from "../../domain";
import { ServiceMapDatasource } from "../../domain/datasources/service-map.datasource";
import { ServiceMap } from "../../domain/entities/service-map.entity";


export class ServiceMapDatasourceImpl extends ServiceMapDatasource {

    getById(service_id: number): Promise<ServiceMap> {
        throw new Error("Method not implemented.");
    }

    getAll(): Promise<ServiceMap[]> {
        throw new Error("Method not implemented.");
    }

    async getByPlace(place_id: number): Promise<ServiceMap[]> {
        try {
            const place_services = await prisma.place_service_layer_designe.findMany({
                where: { place_id: place_id },
                include: { service_map: true }
            })
            const services = place_services.map( service => service.service_map)
            return services.map( service => ServiceMap.fromObject(service))
        } catch (error) {
            console.error(error);
            throw CustomError.internalServer("Internal server error");
        }
    }


}
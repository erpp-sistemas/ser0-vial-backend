import { prisma } from "../../data/sqlserver";
import { CustomError } from "../../domain";
import { LayerDatasource } from "../../domain/datasources/layer.datasource";
import { LayerEntity } from "../../domain/entities/layer.entity";


export class LayerDatasourceImpl extends LayerDatasource {

    getAll(): Promise<LayerEntity[]> {
        throw new Error("Method not implemented.");
    }

    getById(layer_id: number): Promise<LayerEntity> {
        throw new Error("Method not implemented.");
    }

    async getByPlace(place_id: number): Promise<LayerEntity[]> {
        try {
            const layers_place = await prisma.place_service_layer_designe.findMany({
                where: { place_id: place_id },
                include: { layer: true, service_map: true, designe_layer: true }
            })
            const layers = layers_place.map( l => ({
                created_at: l.created_at,
                layer_id: l.layer.layer_id,
                name_layer: l.layer.name_layer,
                cluster: l.layer.cluster,
                service_id: l.service_id,
                name_service: l.service_map.name_service,
                color: l.designe_layer.color,
                opacity: l.designe_layer.opacity,
                type: l.designe_layer.type,
                url: l.url_geoserver,
                is_large: l.is_large
            }));
            return layers.map( layer => LayerEntity.fromObject(layer))
        } catch (error) {
            console.error(error)
            throw CustomError.internalServer('Internal server error')
        }
    }

}


export class LayerEntity {

    constructor(
        public layer_id: number,
        public name_layer: string,
        public cluster: number,
        public service_id: number,
        public name_service: string,
        public color: string,
        public opacity: number,
        public type: string,
        public url: string,
        public is_large: number
    ){ }

    static fromObject( object: any ): LayerEntity {

        const { layer_id, name_layer, cluster, service_id, name_service, color, opacity, type, url, is_large } = object;

        return new LayerEntity(layer_id, name_layer, cluster, service_id, name_service, color, opacity, type, url, is_large);

    }

}


export class ServiceMap {

    constructor(
        public service_id: number,
        public name_service: string,
        public icon_service: string,
        public order: number,
        public default_active: number,
        public created_at: string
    ){}

    static fromObject( object: any ): ServiceMap {
        const { service_id, name_service, icon_service, order, default_active, created_at } = object;
        return new ServiceMap(service_id, name_service, icon_service, order, default_active, created_at)
    }

}
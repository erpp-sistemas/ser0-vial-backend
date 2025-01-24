
interface Features {
    type: string;
    id: string;
    geometry: {
        type: string;
        coordinates: number[];
    };
    properties: { [key: string]: any };
}

export class GeoserverEntity {

    constructor(
        public type: string,
        public features: Features,
        public totalFeatures: number,
        public numberMatched: number,
        public numberReturned: number,
        public timeStamp: string,
        public crs: { type: string, properties: { name: string } },
    ){}

    static fromObject(obj: any): GeoserverEntity {

        const { type, features, totalFeatures, numberMatched, numberReturned, timeStamp, crs} = obj;

        return new GeoserverEntity(type, features, totalFeatures, numberMatched, numberReturned, timeStamp, crs);

    }

}
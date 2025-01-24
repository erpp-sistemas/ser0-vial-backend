import { Request, Response } from "express";
import { GeoserverRepository } from "../../domain/repositories/geoserver.repository";
import { GetData } from '../../domain/uses-cases/geoserver/get-data';

export class GeoserverController {

    constructor(
        private repository: GeoserverRepository
    ) { }

    getDataByUrl = (req: Request, res: Response) => {
        const { url } = req.body;
        new GetData(this.repository).execute(url)
            .then(data => res.status(200).send(data))
            .catch(error => res.status(500).send(error))
    }

}
import { Request, Response } from "express";
import { ServiceMapRepository } from "../../domain/repositories/service-map.repository";
import { GetByPlace } from '../../domain/uses-cases/servicve-map/get-by-place';

export class ServiceMapController {

    constructor(
        private repository: ServiceMapRepository
    ){}

    getByPlace = (req: Request, res: Response) => {
        const { place_id } = req.params;
        new GetByPlace(this.repository).execute(Number(place_id))
            .then( services => res.json(services))
            .catch( error => res.status(400).json({ message: error }));
    }

}
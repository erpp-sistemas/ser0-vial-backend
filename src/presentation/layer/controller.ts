import { Request, Response } from "express";
import { LayerRepository } from "../../domain/repositories/layer.repository";
import { GetByPlace } from '../../domain/uses-cases/layer/get-by-place';

export class LayerController {

    constructor(
        private repository: LayerRepository
    ) {}

    getByPlace = (req: Request, res: Response) => {
        const { place_id } = req.params;
        new GetByPlace(this.repository).execute(Number(place_id))
            .then( layers => res.json(layers) )
            .catch( error => res.status(500).json(error));
    }

}
import { Request, Response } from 'express';
import { FormRepository } from '../../domain/repositories/form.repository';
import { GetAllForms, GetFormsByPlace } from '../../domain/uses-cases';


export class FormController {

    constructor(
        private repository: FormRepository
    ) { }

    getAllForms = async (req: Request, res: Response) => {
        new GetAllForms(this.repository).execute()
            .then(forms => res.status(200).json(forms))
            .catch(error => res.status(500).json({ error }))
    }

    getFormsByPlace = async (req: Request, res: Response) => {
        const { place_id } = req.params;
        new GetFormsByPlace(this.repository).execute(Number(place_id))
            .then(forms => res.status(200).json(forms))
            .catch(error => res.status(500).json({ error }))
    }


}
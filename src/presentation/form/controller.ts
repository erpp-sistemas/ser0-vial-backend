import { Request, Response } from 'express';
import { FormRepository } from '../../domain/repositories/form.repository';
import { GetAllForms } from '../../domain/uses-cases';


export class FormController {
    
    constructor(
        private repository: FormRepository
    ){}
    
    GetAllForms = async (req: Request, res: Response) => {
        new GetAllForms(this.repository).execute()
            .then(forms => res.status(200).json(forms))
            .catch(error => res.status(500).json({error}))
    }


}
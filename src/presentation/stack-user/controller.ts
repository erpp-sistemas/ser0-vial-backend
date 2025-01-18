import { Request, Response } from "express";
import { StackUserRepository } from "../../domain/repositories/stack-user.repository";
import { InsertPercentageDto } from "../../domain/dtos/stack_user/insert-percentage.dto";
import { InsertPercentage } from '../../domain/uses-cases/stack-user/Insert-percentage';


export class StackUserController {

    constructor(
        private repository: StackUserRepository
    ){}

    insertPercentage = (req: Request, res: Response) => {

        const [ error, dto ] = InsertPercentageDto.create(req.body);
        if(error) return res.status(400).json(error);

        new InsertPercentage(this.repository).execute(dto!)
            .then( stackUser => res.status(200).json(stackUser))
            .catch( error => res.status(400).json( { error } ))
        

    }

}
import { Request, Response } from "express";
import { PhotoRepository } from "../../domain/repositories/photo.repository";
import { InsertPhoto } from '../../domain/uses-cases/photo/insert-photo';
import { RegisterPhotoDto } from '../../domain/dtos/photo/register-photo.dto';

export class PhotoController {

    constructor(
        private repository: PhotoRepository
    ) { }

    insertPhoto = (req: Request, res: Response) => {

        const [error, dto] = RegisterPhotoDto.create(req.body);
        if (error) res.status(400).json({error});

        new InsertPhoto(this.repository).execute(dto!)
            .then(newPhoto => res.json(newPhoto))
            .catch(error => res.status(400).json({error}))

    }

}
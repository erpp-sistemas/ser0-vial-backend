import { RegisterPhotoDto } from "../../dtos/photo/register-photo.dto";
import { PhotoEntity } from "../../entities/photo.entity";
import { PhotoRepository } from "../../repositories/photo.repository";


interface InsertPhotouseCase {
    execute(dto: RegisterPhotoDto): Promise<PhotoEntity>
}

export class InsertPhoto implements InsertPhotouseCase {
    
    constructor(
        private repository: PhotoRepository
    ){}


    execute(dto: RegisterPhotoDto): Promise<PhotoEntity> {
        return this.repository.insert(dto);
    }

}
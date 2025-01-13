import { PhotoDataSource } from "../../domain/datasources/photo.datasource";
import { RegisterPhotoDto } from "../../domain/dtos/photo/register-photo.dto";
import { PhotoEntity } from "../../domain/entities/photo.entity";
import { PhotoRepository } from "../../domain/repositories/photo.repository";


export class PhotoRepositoryImpl extends PhotoRepository {
    
    constructor(
        private datasource: PhotoDataSource
    ){super();}


    insert(dto: RegisterPhotoDto): Promise<PhotoEntity> {
        return this.datasource.insert(dto);
    }


}
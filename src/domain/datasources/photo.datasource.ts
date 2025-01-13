import { RegisterPhotoDto } from "../dtos/photo/register-photo.dto";
import { PhotoEntity } from "../entities/photo.entity";


export abstract class PhotoDataSource {

    abstract insert(dto: RegisterPhotoDto): Promise<PhotoEntity>;

}
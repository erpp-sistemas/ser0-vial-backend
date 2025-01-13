import { prisma } from "../../data/sqlserver";
import { CustomError } from "../../domain";
import { PhotoDataSource } from "../../domain/datasources/photo.datasource";
import { RegisterPhotoDto } from "../../domain/dtos/photo/register-photo.dto";
import { PhotoEntity } from "../../domain/entities/photo.entity";


export class PhotoDatasourceImpl extends PhotoDataSource {

    async insert(dto: RegisterPhotoDto): Promise<PhotoEntity> {

        try {
            const new_photo = await prisma.register_photo.create({
                data: dto
            })
            return PhotoEntity.fromObject(new_photo)
        } catch (error) {
            console.error(error);
            throw CustomError.internalServer("Internal server error");
        }

    }

}
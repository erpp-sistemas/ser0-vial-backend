import { prisma } from "../../data/sqlserver";
import { FormDatasource } from "../../domain/datasources/form.datasource";
import { FormEntity } from "../../domain/entities/form.entity";


export class FormDatasourceImpl extends FormDatasource {

    async getAll(): Promise<FormEntity[]> {
        try {
            const forms = await prisma.form.findMany({
                include: {
                    form_field: {
                        include: {
                            field: true, // Traer la información de los campos relacionados
                        },
                    },
                    form_photo_form: { include: { photo_form: true } }
                },
            });
            return forms.map(form => FormEntity.fromJson(form));
        } catch (error) {
            console.error(error);
            throw new Error("Error al obtener los formularios");
        }
    }

    getById(form_id: number): Promise<FormEntity> {
        throw new Error("Method not implemented.");
    }

}
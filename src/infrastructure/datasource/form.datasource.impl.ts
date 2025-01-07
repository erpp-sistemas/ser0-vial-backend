import { prisma } from "../../data/sqlserver";
import { FormDatasource } from "../../domain/datasources/form.datasource";
import { FormEntity } from "../../domain/entities/form.entity";


export class FormDatasourceImpl extends FormDatasource {

    async getByPlace(place_id: number): Promise<FormEntity[]> {
        try {
            const data = await prisma.place.findMany({
                where: { place_id: place_id },
                include: {
                    place_form: {
                        include: {
                            form: {
                                include: {
                                    form_field: {
                                        include: {
                                            field: true,
                                        },
                                    },
                                    form_photo_form: { include: { photo_form: true } }
                                },
                            }
                        }
                    }
                }
            });
            const place_form = data.map(place_f => place_f.place_form)
            const forms = place_form[0].map(f => f.form);

            return forms.map(form => FormEntity.fromJson(form));
        } catch (error) {
            console.error(error);
            throw new Error("Error al obtener los formularios");
        }
    }

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
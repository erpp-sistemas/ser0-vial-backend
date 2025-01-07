import { FormDatasource } from "../../domain/datasources/form.datasource";
import { FormEntity } from "../../domain/entities/form.entity";
import { FormRepository } from "../../domain/repositories/form.repository";


export class FormRepositoryImpl extends FormRepository {

    constructor(
        private formDatasource: FormDatasource
    ) {super();}

    getByPlace(place_id: number): Promise<FormEntity[]> {
        return this.formDatasource.getByPlace(place_id);
    }

    async getAll(): Promise<FormEntity[]> {
        return this.formDatasource.getAll();
    }

    getById(form_id: number): Promise<FormEntity> {
        throw new Error("Method not implemented.");
    }

}
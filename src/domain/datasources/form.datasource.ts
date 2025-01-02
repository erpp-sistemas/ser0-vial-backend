import { FormEntity } from "../entities/form.entity";


export abstract class FormDatasource {
    abstract getAll(): Promise<FormEntity[]>;
    abstract getById(form_id: number): Promise<FormEntity>;
}
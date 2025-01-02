import { FormEntity } from "../entities/form.entity";


export abstract class FormRepository {
    abstract getAll(): Promise<FormEntity[]>;
    abstract getById(form_id: number): Promise<FormEntity>;
}
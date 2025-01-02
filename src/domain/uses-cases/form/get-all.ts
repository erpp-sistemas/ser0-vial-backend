import { FormEntity } from "../../entities/form.entity";
import { FormRepository } from "../../repositories/form.repository";

interface GetAllFormsUseCase {
    execute(): Promise<FormEntity[]>
}

export class GetAllForms implements GetAllFormsUseCase {
    
    constructor(
        private repository: FormRepository
    ) {}
    
    execute(): Promise<FormEntity[]> {
        return this.repository.getAll();
    }

}
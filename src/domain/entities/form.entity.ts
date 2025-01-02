

export class FormEntity {

    constructor(
        public form_id: number,
        public name_form: string,
        public icono_app_movil: string,
        public route_app_movil: string,
        public have_signature: number,
        public form_field: any[],
        // public field_id: number,
        // public name_field: string,
        // public type_db: string,
        // public type_field_form: string,
        // public type_form: string,
        // public options_select: string,
        // public mandatory: number,
        // public type_select: string,
        // public parent_field_id: number,
        // public order: number,
    ){}

    static fromJson(data: any): FormEntity {
        return new FormEntity(
            data.form_id,
            data.name_form,
            data.icono_app_movil,
            data.route_app_movil,
            data.have_signature,
            data.form_field,
        )
    }

}


export class FormEntity {

    constructor(
        public form_id: number,
        public name_form: string,
        public icono_app_movil: string,
        public route_app_movil: string,
        public have_signature: number,
        public form_field: any[],
        public form_photo_form: any[],
    ){}

    static fromJson(data: any): FormEntity {
        return new FormEntity(
            data.form_id,
            data.name,
            data.icono_app_movil,
            data.route_app_movil,
            data.have_signature,
            data.form_field,
            data.form_photo_form
        )
    }

}
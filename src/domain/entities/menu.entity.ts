


export class MenuEntity {


    constructor(
        public section: string,
        public id_menu: number,
        public id_menu_parent: number,
        public name: string,
        public icon: string,
        public route: string,
        public is_active: boolean
    ) { }


    static fromObject(objeto: { [key: string]: any }): MenuEntity {

        let { section, id_menu, id_menu_parent, name_menu, icon, route, is_active } = objeto;

        return new MenuEntity( section, id_menu, id_menu_parent, name_menu, icon, route, is_active)
    
    }

}
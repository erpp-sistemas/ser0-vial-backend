import { CustomError } from "../errors/custom.error";

export class AccessEntity {
  constructor(
    public access_id: number,
    public username: string,
    public password: string,
    public token: string,
    public first_name: string,
    public middle_name: string, 
    public paternal_surname: string,
    public maternal_surname: string, 
    public birthdate: string,	
    public photo_url: string, 
    public entry_date: string, 
    public low_date: string, 
    public access_web: boolean, 
    public access_movil: boolean, 
    public role_id: number,
    public user_id?: number,
    public active?: number,
    
  ) {}

  /**
   * Método estático para crear una instancia de LoginEntity desde un objeto genérico
   */
  static fromObject(object: { [key: string]: any }): AccessEntity {
    const { access_id, username, password, token, first_name,	middle_name, paternal_surname, maternal_surname, birthdate,	photo_url, entry_date, low_date, access_web, access_movil, role_id, user_id, active } = object;

    // Validaciones
    if (!username) throw CustomError.badRequest("Missing username");
    //if (!password) throw CustomError.badRequest("Missingg password");

    return new AccessEntity(access_id, username, password, token, first_name,	middle_name, paternal_surname, maternal_surname, birthdate,	photo_url, entry_date, low_date, access_web, access_movil, role_id, user_id, active);
  }

  /**
   * Método para validar si el acceso está activo
   */
  isActive(): boolean {
    return this.active === 1;
  }

  /**
   * Método para verificar credenciales
   */
  validateCredentials(inputPassword: string): boolean {
    return this.password === inputPassword;
  }
}

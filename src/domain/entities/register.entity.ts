import { Decimal } from "@prisma/client/runtime/library";
import { CustomError } from "../errors/custom.error";

export class RegisterEntity {
  constructor(
    public id: number,
    public place_id: number,
    public data_json: string,
    public registration_date: string,
    public form_id: number,
    public latitude: number,
    public longitude: number,
    public user_id: number
  ) {}

  /**
   * Método estático para crear una instancia de LoginEntity desde un objeto genérico
   */
  static fromObject(object: { [key: string]: any }): RegisterEntity {
    const {
      id,
      place_id,
      data_json,
      registration_date,
      form_id,
      latitude,
      longitude,
      user_id,
    } = object;

    // Validaciones
    // if (!username) throw CustomError.badRequest("Missing username");
    //if (!password) throw CustomError.badRequest("Missingg password");

    return new RegisterEntity(
      id,
      place_id,
      data_json,
      registration_date,
      form_id,
      latitude,
      longitude,
      user_id
    );
  }
}

export class RegisterDto {
  private constructor(
    public place_id: number,
    public form_id: number,
    public date_init: string,
    public date_end: string
  ) {}

  static create(object: { [key: string]: any }): [string?, RegisterDto?] {
    const { place_id, form_id, date_init, date_end } = object;

    if (!place_id) return ["Missing place_id"];
    if (!form_id) return ["Missing form_id"];
    if (!date_init) return ["Missing date_init"];
    if (!date_end) return ["Missing date_end"];

    return [undefined, new RegisterDto(place_id, form_id, date_init, date_end)];
  }
}

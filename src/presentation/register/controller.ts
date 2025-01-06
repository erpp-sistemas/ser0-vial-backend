import { Request, Response } from "express";
import { RegisterDto } from "../../domain";
import { RegisterRepository } from "../../domain/repositories/register.repository";
import { GetByDates } from "../../domain/uses-cases/register/get-by-dates";

export class RegisterController {
  // * DI
  constructor(public registerRepository: RegisterRepository) {}

  getByDates = (req: Request, res: Response) => {
    const [error, registerDto] = RegisterDto.create(req.body);
    if (error) return res.status(400).json({ error });

    // * llamar al service -> mas sencillo

    // * llamar al caso de uso -> clean architecture
    new GetByDates(this.registerRepository)
      .execute(registerDto!)
      .then((registers) => res.json(registers))
      .catch((error) => res.status(400).json({ error }));
  };
}

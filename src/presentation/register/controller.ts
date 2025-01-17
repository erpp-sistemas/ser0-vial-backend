import { Request, Response } from "express";
import { InsertRegisterDto, RegisterDto } from "../../domain";
import { RegisterRepository } from "../../domain/repositories/register.repository";
import { CreateRegister, GetByDates } from '../../domain/uses-cases';


export class RegisterController {
  // * DI
  constructor(public registerRepository: RegisterRepository) { }

  getByDates = (req: Request, res: Response) => {
    const [error, registerDto] = RegisterDto.create(req.body);
    if (error) return res.status(400).json({ error });

    new GetByDates(this.registerRepository)
      .execute(registerDto!)
      .then((registers) => res.json(registers))
      .catch((error) => res.status(400).json({ error }));
  };

  createRegister = (req: Request, res: Response) => {
    const [error, inserRegistertDto] = InsertRegisterDto.create(req.body);
    if (error) return res.status(400).json({ error });


    new CreateRegister(this.registerRepository).execute(inserRegistertDto!)
      .then(new_register => res.status(200).json(new_register))
      .catch((error) => res.status(400).json({ error }));
  }

}

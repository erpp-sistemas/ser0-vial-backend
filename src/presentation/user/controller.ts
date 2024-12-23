import { Request, Response } from "express";
import { UserRepository } from "../../domain/repositories/user.repository";
import { GetAllUsers, GetUserById, DeleteUserById, GetUsersByPlace, UpdateUserById,CreateUser, UpdateThemeColorByUserId } from '../../domain/uses-cases';
import { CreateUserDto } from "../../domain";


export class UserController {

    constructor(
        private repository: UserRepository
    ) { }

    getAll = (req: Request, res: Response) => {
        new GetAllUsers(this.repository).execute()
            .then(users => res.status(200).json(users))
            .catch(error => res.status(400).json({ error }))
    }

    getById = (req: Request, res: Response) => {
        const { user_id } = req.params;
        new GetUserById(this.repository).execute(Number(user_id))
            .then(user => res.status(200).json(user))
            .catch(error => res.status(400).json({ error }))
    }

    getByPlace = (req: Request, res: Response) => {
        const { place_id } = req.params;
        new GetUsersByPlace(this.repository).execute(Number(place_id))
            .then(users => res.status(200).json(users))
            .catch(error => res.status(400).json({ error }))
    }

    deleteUser = (req: Request, res: Response) => {
        const { user_id } = req.body;
        new DeleteUserById(this.repository).execute(Number(user_id))
            .then(user_deleted => res.status(200).json({message: 'User desactivated successfully'}))
            .catch(error => res.status(400).json({ error }))
    }

    updateUser = (req: Request, res: Response) => {
        const { user_id, new_data } = req.body;
        new UpdateUserById(this.repository).execute(Number(user_id), new_data)
            .then(user_update => res.status(200).json({ message: 'User updated successfully' }))
            .catch(error => res.status(400).json({ error }))
    }

    createUser = (req: Request, res: Response) => {
        const [ error, userDto ] = CreateUserDto.create(req.body);
        if (error) return res.status(400).json({ error });

        new CreateUser(this.repository).execute(userDto!)
            .then( new_user => res.status(200).json(new_user))
            .catch(error => res.status(400).json({ error }))
        
    }
    updateThemeColorByUserId = (req: Request, res: Response) => {
        const { user_id, theme_color } = req.body;

        console.log("user_id:", user_id)
        console.log("theme_color:", theme_color)

        if (!user_id || !theme_color) {
            return res.status(400).json({ error: 'user_id and theme_color are required' });
        }

        new UpdateThemeColorByUserId(this.repository).execute(Number(user_id), theme_color)
            .then(message => res.status(200).json({ message }))
            .catch(error => {
                console.error("Error ", error)
                res.status(400).json({ error })
            })      
    }


}
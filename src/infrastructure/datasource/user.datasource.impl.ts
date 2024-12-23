import { prisma } from "../../data/sqlserver";
import { CreateUserDto, CustomError } from "../../domain";
import { UserDatasource } from "../../domain/datasources/user.datasource";
import { UserEntity } from "../../domain/entities/user.entity";
//import { auth, db } from '../../firebase';


export class UserDatasourceImpl extends UserDatasource {

    async getAll(): Promise<UserEntity[]> {

        try {
            const users = await prisma.user.findMany({
                where: { active: 1 },
                include: {
                    role: true,
                    place_user: {
                        include: {
                            place: true
                        }
                    }
                }
            });
            return users.map(user => UserEntity.fromObject(user));
        } catch (error) {
            console.error(error)
            throw CustomError.internalServer('Internal server error')
        }

    }


    async getById(user_id: number): Promise<UserEntity> {
        try {
            const user = await prisma.user.findUnique({
                where: { user_id: user_id },
                include: {
                    role: true,
                    place_user: {
                        include: {
                            place: true
                        }
                    }
                }
            });
            if (!user) throw new Error('Usuario no encontrado');
            return UserEntity.fromObject(user);
        } catch (error) {
            console.error(error)
            throw CustomError.internalServer('Internal server error')
        }
    }


    async getByPlaceId(place_id: number): Promise<UserEntity[]> {
        try {
            const users_with_places = await prisma.place_user.findMany({
                where: { place_id: place_id },
                include: {
                    user: {
                        include: {
                            role: true
                        }
                    }
                }
            })
            if (users_with_places.length === 0) {
                throw new Error('No users found for this place');
            }
            return users_with_places.map(user => UserEntity.fromObject(user.user!))
        } catch (error) {
            console.error(error)
            throw CustomError.internalServer('Internal server error')
        }
    }

    async create(user: CreateUserDto): Promise<UserEntity> {
        try {
            
            const new_user = await prisma.user.create({
                data: user
            })
            //todo crear el usuario en firebase
            
            return UserEntity.fromObject(new_user)
        } catch (error) {
            console.error(error)
            throw CustomError.internalServer('Internal server error')
        }

    }


    async update(user_id: number, data: any): Promise<UserEntity> {
        try {
            const update_user = await prisma.user.update({
                where: { user_id: user_id },
                data: data
            })
            return UserEntity.fromObject(update_user);
        } catch (error) {
            console.error(error)
            throw CustomError.internalServer('Internal server error')
        }
    }   

    async updateThemeColorByUserId(user_id: number, theme_color: string): Promise<string> {
        try {
            await prisma.user.update({
                where: { user_id: user_id },
                data: { theme_color: theme_color },
            });
            return 'Update changes in notifications_web success'
        } catch (error) {
            console.error(error);
            throw CustomError.internalServer('Internal server error');
        }
    }


    async delete(user_id: number): Promise<UserEntity> {
        try {
            const user_desactivated = await prisma.user.update({
                where: { user_id: user_id },
                data: { active: 0 }
            })

            //todo cambiar a false el campo isActive del firebase
            return UserEntity.fromObject(user_desactivated);
        } catch (error) {
            console.error(error)
            throw CustomError.internalServer('Internal server error')
        }
    }


}
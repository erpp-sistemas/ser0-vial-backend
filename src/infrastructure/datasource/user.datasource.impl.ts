import { prisma } from "../../data/sqlserver";
import { CreateUserDto, CustomError } from "../../domain";
import { UserDatasource } from "../../domain/datasources/user.datasource";
import { UserEntity } from "../../domain/entities/user.entity";
import { Encrypt } from '../../config/encrypt.adapter';
import { FirebaseService } from "../../presentation/services/firebase.service";



export class UserDatasourceImpl extends UserDatasource {

    constructor(
        private firebaseService: FirebaseService
    ) { super() }

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
            let { username, password, ...rest } = user;

            const user_find = await prisma.access.findFirst({ where: { username: username } });
            if (user_find) throw CustomError.badRequest('Email already exists');

            const password_encrypt = Encrypt.hash(password);

            const new_user = await prisma.user.create({ data: rest });
            await prisma.access.create({
                data: {
                    username,
                    password: password_encrypt,
                    user_id: new_user.user_id,
                    active: 1
                }
            });
            if (new_user.access_movil) {
                const firebase_user = await this.firebaseService.createUser(username, password);
                const uid = firebase_user.uid;
                await this.firebaseService.createUserDocFirestore(uid, {
                    email: username,
                    IMEI: uid,
                    isActive: true,
                    lastSession: '',
                    lastSync: '',
                    name: `${new_user.first_name} ${new_user.middle_name} ${new_user.paternal_surname} ${new_user.maternal_surname}`,
                    password: password,
                    totalAccounts: 0,
                    uid: uid,
                    user_id: new_user.user_id
                })
            }

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

            await this.firebaseService.updateUserDocById(user_id, { isActive: false });

            return UserEntity.fromObject(user_desactivated);
        } catch (error) {
            console.error(error)
            throw CustomError.internalServer('Internal server error')
        }
    }





}
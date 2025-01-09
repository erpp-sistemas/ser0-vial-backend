import { Encrypt } from "../../config/encrypt.adapter";
import { JwtAdapter } from "../../config/jwt.adapter";
import { prisma } from "../../data/sqlserver";
import { CustomError, LoginDto, AccessEntity } from "../../domain";
import { AccessDatasource } from "../../domain/datasources/access.datasource";

export class AccessDatasourceImpl implements AccessDatasource {
  async login(loginDto: LoginDto): Promise<AccessEntity> {
    const access = await prisma.access.findFirst({
      where: { username: loginDto.username },
    });

    console.log(access);
    if (!access) throw CustomError.badRequest("Email not exist");

    if (access.active === 0) throw CustomError.badRequest("User not active");

    console.log("password: ", access.password);

    const isMatching = Encrypt.compare(loginDto.password, access.password!);

    console.log("isMatching: ", isMatching);
    if (!isMatching) throw CustomError.badRequest("Password is not valid");

    const token = await JwtAdapter.generateToken({
      id: access.user_id,
      email: access.username,
    });

    console.log("token:", token);

    if (!token) throw CustomError.internalServer("Error while creating JWT");

    if (!access || access.user_id === null) {
      throw CustomError.badRequest("Invalid access data");
    }

    const user_info = await prisma.user.findUnique({
      where: { user_id: access.user_id! },
      include: {
        role: true,
        place_user: {
          include: {
            place: true,
          },
        },
      },
    });

    // const data_user: any[] =
    //   await prisma.$queryRaw`EXEC sp_access @user_id=${access.user_id}`;
    // const user_info = data_user[0];

    console.log('first', access.username)

    const { password, ...accessEntity } = AccessEntity.fromObject({
      ...user_info,
      token,
      username: access.username,
      password: access.password,
    });

    return AccessEntity.fromObject(accessEntity);
  }
}

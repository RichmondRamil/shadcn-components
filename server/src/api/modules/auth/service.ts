import Container, { Service } from 'typedi';
import { IUser } from '@/shared/interfaces/IUser';
import { PrismaClient } from '@prisma/client';

@Service()
export default class AuthService {
  public async SignUp(body: any): Promise<{ user: IUser }> {
    try {
      const prisma: PrismaClient = Container.get('PrismaClient');
      // Create an example usign the prisma client
      // const user = await prisma.user.create({ data: { ...body } });

      return { user: {} as IUser };
    } catch (e) {
      throw e;
    }
  }
}

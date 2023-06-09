import Container, { Service, Inject } from 'typedi';
import jwt from 'jsonwebtoken';
import config from '@/config';
import argon2 from 'argon2';
import { randomBytes } from 'crypto';
import { IUser } from '@/shared/interfaces/IUser';
// import LoggerInstance from bunyan;
// import type { LoggerInstance } from 'bunyan';
import { loggerType } from '@/loaders/logger';
import { PrismaClient } from '@prisma/client';

@Service()
export default class AuthService {
  public async SignUp(body: any): Promise<{ user: IUser }> {
    try {
      const logger: loggerType = Container.get('logger');
      const prisma: PrismaClient = Container.get('PrismaClient');
      // Create an example usign the prisma client
      // const user = await prisma.user.create({ data: { ...body } });

      return { user: {} as IUser };
    } catch (e) {
      throw e;
    }
  }
  // private generateToken(user) {
  //   const today = new Date();
  //   const exp = new Date(today);
  //   exp.setDate(today.getDate() + 60);
  //   /**
  //    * A JWT means JSON Web Token, so basically it's a json that is _hashed_ into a string
  //    * The cool thing is that you can add custom properties a.k.a metadata
  //    * Here we are adding the userId, role and name
  //    * Beware that the metadata is public and can be decoded without _the secret_
  //    * but the client cannot craft a JWT to fake a userId
  //    * because it doesn't have _the secret_ to sign it
  //    * more information here: https://softwareontheroad.com/you-dont-need-passport
  //    */
  //   return jwt.sign(
  //     {
  //       _id: user._id, // We are gonna use this in the middleware 'isAuth'
  //       role: user.role,
  //       name: user.name,
  //       exp: exp.getTime() / 1000,
  //     },
  //     config.jwt.secret,
  //   );
  // }
}

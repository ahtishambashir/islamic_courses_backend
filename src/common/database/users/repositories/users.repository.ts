import { Inject, InternalServerErrorException } from '@nestjs/common';
import { BaseRepository, IQueryOptions } from '../../base.repository';
import { DATABASE_CONNECTION } from '../../database.consts';
import { DataSource } from 'typeorm';
// import { PinoLogger } from 'nestjs-pino';
import { UserEntity } from '../entities/users.entity';

export class UsersRepository extends BaseRepository {
  constructor(
    @Inject(DATABASE_CONNECTION) dataSource: DataSource,
    // private readonly logger: PinoLogger,
  ) {
    super(dataSource);
  }

  private users = [];
  findAll() {
    return this.users;
  }
  findOne(id: string) {
    return this.users.find((user) => user.id === id);
  }
  // create(user: any) {
  //   const newUser = { id: Date.now().toString(), ...user };
  //   this.users.push(newUser);
  //   return newUser;
  // }

  async create(
    data: any,
    options?: IQueryOptions,
  ): Promise<any> {
    const { entityManager } = this.parseOptions(options);
    const repository = entityManager.getRepository<UserEntity>(UserEntity);
    
    const userEntity = new UserEntity();
    Object.assign(userEntity, data);
    try {
      const user = await repository.save(userEntity);
      // this.logger.info(`User created ${util.inspect(user)}`);
      return user;
    } catch (e) {
      throw new InternalServerErrorException('Cannot create new user', {
        cause: new Error(`Cannot create new user: ${e?.message}`),
      });
    }
  }
  update(id: string, updatedUser: any) {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) return null;

    this.users[index] = { ...this.users[index], ...updatedUser };
    return this.users[index];
  }
  remove(id: string) {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) return null;

    return this.users.splice(index, 1)[0];
  }
}

import { Injectable } from '@nestjs/common';
import { UsersRepository } from 'src/common/database/users/repositories/users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  findAll() {
    const allUsers = this.usersRepository.findAll();
    return allUsers;
  }

  getUserById(id: string) {
    const getUser = this.usersRepository.findOne(id);
    return getUser;
  }

  createUser(user: any) {
    const newUser = this.usersRepository.create(user);
    return newUser;
  }

  update(id: string, updatedUser: any) {
    const userIndex = this.usersRepository.update(id, updatedUser);
    return userIndex;
  }

  remove(id: string) {
    const removeUser = this.usersRepository.remove(id);
    return removeUser;
  }
}

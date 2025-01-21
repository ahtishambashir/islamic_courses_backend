import { Module } from '@nestjs/common';
import { UsersController } from './controllers/user.controller';
import { UsersService } from './services/users.service';
import { DatabaseUsersModule } from 'src/common/database/users/database-user.module';
@Module({
  imports: [DatabaseUsersModule],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [],
})
export class UsersModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { configModuleOptionsGetter } from './config/optionsGetters';
import { DatabaseConnectionModule } from './common/database/database.module';


@Module({
  imports: [
    ConfigModule.forRoot(configModuleOptionsGetter()),
    UsersModule,
    DatabaseConnectionModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

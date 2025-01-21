import { Module } from "@nestjs/common";
import { UsersRepository } from "./repositories/users.repository";
// import { DATABASE_CONNECTION } from "../database.consts";
import { DatabaseConnectionModule } from "../database.module";

@Module({
    imports: [DatabaseConnectionModule],
    providers: [UsersRepository],
    exports: [UsersRepository]
  })
  export class DatabaseUsersModule {}
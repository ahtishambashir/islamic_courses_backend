import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DATABASE_CONNECTION } from './database.consts';
import { DataSource } from 'typeorm';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: DATABASE_CONNECTION,
      useFactory: async (configService: ConfigService) => {
        const dataSource = new DataSource({
          type: 'postgres',
          host: configService.get('db.host'),
          port: +configService.get('db.port'),
          username: configService.get('DB_USERNAME'),
          password: String(configService.get('DB_PASSWORD')),
          database: configService.get('DB_DATABASE'),
          entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
          synchronize: configService.get('db.synchronize'),
          logging: configService.get('db.logging'),
        });

        return dataSource.initialize();
      },
      inject: [ConfigService],
    },
  ],
  exports: [DATABASE_CONNECTION],
})
export class DatabaseConnectionModule {}

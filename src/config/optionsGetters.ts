import { v4 as uuid } from 'uuid';
import { ConfigModule, ConfigModuleOptions, ConfigService } from '@nestjs/config';
import { LoggerModuleAsyncParams } from 'nestjs-pino';
import configuration from './configuration';
import { BullRootModuleOptions, SharedBullAsyncConfiguration } from '@nestjs/bull';

export function configModuleOptionsGetter(): ConfigModuleOptions {
  return {
    isGlobal: true,
    ignoreEnvFile: true,
    load: [configuration],
  };
}
export function loggerModuleOptionsGetter(): LoggerModuleAsyncParams {
  return {
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      const level = configService.get('logLevel');

      return {
        pinoHttp: {
          level,
          redact: ['req.headers.authorization'],
          messageKey: 'msg',
          autoLogging: true,
          quietReqLogger: true,
          genReqId: () => uuid(),
          formatters: {
            level(label, number) {
              return { level: label };
            },
          },
        },
      };
    },
  };
}

export function configBullModule(): SharedBullAsyncConfiguration {
  return {
    useFactory: (config: ConfigService) => {
      const settings = config.get('redis');
      if (!settings) {
        throw new Error('Redis settings not found');
      }

      const data: BullRootModuleOptions = {
        redis: {
          host: settings.config.host,
          port: settings.config.port,
          ...(settings.enableRedisAuth && settings.auth && { password: settings.auth }),
        },
        prefix: settings.prefix,
        defaultJobOptions: {
          removeOnComplete: true,
          attempts: 3,
        },
      };

      return data;
    },
    inject: [ConfigService],
  };
}



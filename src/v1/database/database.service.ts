import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  SequelizeOptionsFactory,
  SequelizeModuleOptions,
} from '@nestjs/sequelize';
import { Environment } from 'src/env.validation';

export enum DATABASE_PROVIDER {
  SEQUELIZE = 'SEQUELIZE',
}

@Injectable()
export class SequelizeConfigService implements SequelizeOptionsFactory {
  constructor(private config: ConfigService) {}

  async createSequelizeOptions(): Promise<SequelizeModuleOptions> {
    const options: SequelizeModuleOptions = {
      dialect: this.config.get('DB_DIALECT'),
      database: this.config.get('DB_NAME'),
      host: this.config.get('DB_HOST'),
      port: +this.config.get('DB_PORT'),
      username: this.config.get('DB_USER'),
      password: this.config.get('POSTGRES_PASSWORD'),
      typeValidation: true,
      autoLoadModels: true,
      synchronize: true,
    };

    if (
      !options.dialect &&
      [Environment.Development, Environment.Staging].includes(
        this.config.get('NODE_ENV')!,
      )
    ) {
      console.log('No dialect specified. Loading Memory DB');
      options.dialect = 'sqlite';
      options.storage = ':memory:';
    }

    return options;
  }
}

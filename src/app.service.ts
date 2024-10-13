import { HttpStatus, Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class AppService {
  constructor(private sequelize: Sequelize) {}

  hi() {
    return ':3';
  }

  async up() {
    return this.sequelize
      .validate()
      .then((res) => ({
        message: 'ok',
        code: HttpStatus.OK,
        res,
      }))
      .catch((err) => ({
        message: 'error',
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        error: err,
      }));
  }
}

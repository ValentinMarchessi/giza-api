import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './utils/decorators';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get()
  hi(): string {
    // Health Check

    // Check for db connection status

    return this.appService.hi();
  }

  @Get('/db')
  dbHealthCheck() {
    return this.appService.up();
  }
}

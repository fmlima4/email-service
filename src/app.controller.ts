import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern,  } from '@nestjs/microservices';
import { ApiTags, ApiOperation, ApiResponse  } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern('send_email')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get()
  @ApiOperation({ summary: 'HealthCheck' }) 
  @ApiResponse({ status: 200, description: 'application running'})
  @ApiTags('HealthCheck')
  healthCheck(): string {
    return this.appService.healthCheck();
  }
}

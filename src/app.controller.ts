import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('produce')
  produceMessage() {
    return this.appService.produceMessage();
  }

  @MessagePattern('product_queue')
  consumeMessage(@Payload() message: any) {
    this.appService.consumeMessage(message);
  }
}

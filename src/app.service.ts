import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(
    @Inject('PRODUCT_SERVICE') private readonly client: ClientProxy,
  ) {}

  onModuleInit() {
    this.client.connect();
  }

  getHello(): string {
    return 'Hello World!';
  }

  async produceMessage() {
    return await this.client
      .send('product_queue', {
        name: 'NestJS T-shirt',
        price: 300,
      })
      .toPromise();
  }

  consumeMessage(message: { name: string; price: number }) {
    Logger.log(message, 'Received Message from product_queue');
  }
}

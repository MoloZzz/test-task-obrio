import { Injectable } from '@nestjs/common';

@Injectable()
export class ServiceNotificationService {
  getHello(): string {
    return 'Hello World!';
  }
}

import { Injectable } from '@nestjs/common';

@Injectable()
export class ServiceCoreService {
  getHello(): string {
    return 'Hello World!';
  }
}

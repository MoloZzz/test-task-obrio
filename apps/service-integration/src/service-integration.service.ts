import { Injectable } from '@nestjs/common';

@Injectable()
export class ServiceIntegrationService {
  getHello(): string {
    return 'Hello World!';
  }
}

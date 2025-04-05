import { Controller, Get } from '@nestjs/common';

@Controller()
export class ServiceCoreController {
    constructor() {}

    @Get()
    async getHello(): Promise<string> {
        return 'Hello from service-core';
    }
}

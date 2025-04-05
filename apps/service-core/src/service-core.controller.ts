import { Controller, Get } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

@Controller()
export class ServiceCoreController {
    constructor() {}

    @Get()
    @ApiOperation({ summary: 'Перевірка роботи сервісу' })
    async getHello(): Promise<string> {
        return 'Hello from service-core';
    }
}

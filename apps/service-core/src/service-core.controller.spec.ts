import { Test, TestingModule } from '@nestjs/testing';
import { ServiceCoreController } from './service-core.controller';
import { ServiceCoreService } from './service-core.service';

describe('ServiceCoreController', () => {
    let serviceCoreController: ServiceCoreController;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [ServiceCoreController],
            providers: [ServiceCoreService],
        }).compile();

        serviceCoreController = app.get<ServiceCoreController>(ServiceCoreController);
    });

    describe('root', () => {
        it('should return "Hello World!"', () => {
            expect(serviceCoreController.getHello()).toBe('Hello World!');
        });
    });
});

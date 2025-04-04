import { Test, TestingModule } from '@nestjs/testing';
import { ServiceNotificationController } from './service-notification.controller';
import { ServiceNotificationService } from './service-notification.service';

describe('ServiceNotificationController', () => {
    let serviceNotificationController: ServiceNotificationController;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [ServiceNotificationController],
            providers: [ServiceNotificationService],
        }).compile();

        serviceNotificationController = app.get<ServiceNotificationController>(ServiceNotificationController);
    });

    describe('root', () => {
        it('should return "Hello World!"', () => {
            expect(serviceNotificationController.getHello()).toBe('Hello World!');
        });
    });
});

import { Test, TestingModule } from '@nestjs/testing';
import { ServiceIntegrationController } from './service-integration.controller';
import { ServiceIntegrationService } from './service-integration.service';

describe('ServiceIntegrationController', () => {
  let serviceIntegrationController: ServiceIntegrationController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ServiceIntegrationController],
      providers: [ServiceIntegrationService],
    }).compile();

    serviceIntegrationController = app.get<ServiceIntegrationController>(ServiceIntegrationController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(serviceIntegrationController.getHello()).toBe('Hello World!');
    });
  });
});

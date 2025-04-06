import { Module } from '@nestjs/common';
import { ServiceCoreController } from './service-core.controller';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RmqModule } from '@app/common';
import * as Joi from 'joi';

@Module({
    imports: [
        UserModule,
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: [`apps/service-core/.env`],
            validationSchema: Joi.object({
                DATABASE_HOST: Joi.string().required(),
                DATABASE_PORT: Joi.number().port().required(),
                DATABASE_USER: Joi.string().required(),
                DATABASE_PASSWORD: Joi.string().required(),
                DATABASE_NAME: Joi.string().required(),
                NODE_ENV: Joi.string().valid('development', 'production', 'test').required(),        
                PORT: Joi.number().port().required(),
                RABBIT_MQ_URI: Joi.string().required(),
                RABBIT_MQ_NOTIFICATION_QUEUE: Joi.string().required(),
                RABBIT_MQ_CORE_QUEUE: Joi.string().required(),
              }),
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                type: 'postgres',
                host: configService.get<string>('DATABASE_HOST'),
                port: configService.get<number>('DATABASE_PORT'),
                username: configService.get<string>('DATABASE_USER'),
                password: configService.get<string>('DATABASE_PASSWORD'),
                database: configService.get<string>('DATABASE_NAME'),
                autoLoadEntities: true,
                synchronize: true,
                ...(configService.get<string>('NODE_ENV') === 'development' ? {} : { ssl: { rejectUnauthorized: false } }),
            }),
            inject: [ConfigService],
        }),
        RmqModule,
    ],
    controllers: [ServiceCoreController],
    providers: [],
})
export class ServiceCoreModule {}

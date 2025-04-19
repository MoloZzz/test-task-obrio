import { Module } from '@nestjs/common';
import { ServiceCoreController } from './service-core.controller';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RmqModule } from '@app/common';
import * as Joi from 'joi';
import { PostgresqlModule } from './libs/postgresql/postgresql.module';
import { entities } from './common/entities';
import { migrations } from './common/migrations';

@Module({
    imports: [
        UserModule,
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: [`apps/service-core/.env`],
            validationSchema: Joi.object({
                POSTGRES_HOST: Joi.string().required(),
                POSTGRES_PORT: Joi.number().port().required(),
                POSTGRES_USER: Joi.string().required(),
                POSTGRES_PASS: Joi.string().required(),
                POSTGRES_DB_NAME: Joi.string().required(),
                NODE_ENV: Joi.string().valid('development', 'production', 'test').required(),
                PORT: Joi.number().port().required(),
                RABBIT_MQ_URI: Joi.string().required(),
                RABBIT_MQ_NOTIFICATION_QUEUE: Joi.string().required(),
                RABBIT_MQ_CORE_QUEUE: Joi.string().required(),
            }),
        }),
        PostgresqlModule.register(entities, migrations, []),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                type: 'postgres',
                host: configService.get<string>('POSTGRES_HOST'),
                port: configService.get<number>('POSTGRES_PORT'),
                username: configService.get<string>('POSTGRES_USER'),
                password: configService.get<string>('POSTGRES_PASS'),
                POSTGRES: configService.get<string>('POSTGRES_DB_NAME'),
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

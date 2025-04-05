import { Module } from '@nestjs/common';
import { ServiceCoreController } from './service-core.controller';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        UserModule,
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: [`apps/service-core/.env`],
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
    ],
    controllers: [ServiceCoreController],
    providers: [],
})
export class ServiceCoreModule {}

import { Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter, HttpAdapterHost } from '@nestjs/core';
import { LoggerService } from './logger.service';

@Catch()
export class GlobalExceptionFilter extends BaseExceptionFilter {
    constructor(
        readonly httpAdapterHost: HttpAdapterHost,
        private readonly logger: LoggerService,
    ) {
        super();
    }

    catch(exception: any, host: ArgumentsHost): void {
        if (exception instanceof HttpException) {
            super.catch(exception, host);
        } else {
            const { httpAdapter } = this.httpAdapterHost;
            const ctx = host.switchToHttp();
            const request = ctx.getRequest();

            const message = Object.keys(exception).length === 0 ? exception.toString() : exception.message || 'Unknown error';
            const statusCode = HttpStatus.INTERNAL_SERVER_ERROR;

            const data = {
                statusCode,
                userId: request?.user?.id,
                path: httpAdapter.getRequestUrl(request),
                stack: Object.keys(exception).length === 0 ? { message } : exception,
                message,
            };
            // Extend logs with exception data
            this.logger.error(JSON.stringify(data));
            // Send modified response
            httpAdapter.reply(ctx.getResponse(), { statusCode, message }, statusCode);
        }
    }
}

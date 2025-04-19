import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    private readonly logger = new Logger('Request');

    use(req: Request, res: Response, next: Function) {
        const { method, originalUrl, body, query, params } = req;
        const startTime = Date.now();

        res.on('finish', () => {
            const duration = Date.now() - startTime;
            this.logger.log(`${method} ${originalUrl} - ${res.statusCode} [${duration}ms]`);
        });

        next();
    }
}

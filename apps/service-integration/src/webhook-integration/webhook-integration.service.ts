import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import config from '../../config';
import { AxiosResponse } from 'axios';

const webhookConfig = config().webhook;

@Injectable()
export class WebhookIntegrationService {
    private readonly urlBase: string;
    private readonly urlToken: string;

    constructor(private readonly httpService: HttpService) {
        this.urlBase = webhookConfig.baseUrl;
        this.urlToken = this.urlBase + '/token';
    }

    /**
     * Generate unique URL for webhook by webhook.site
     * @param name - identifier for webhook
     * @returns Unique URL
     */
    async generateUrl(name: string): Promise<string> {
        const response: AxiosResponse = await this.httpService.axiosRef.post(this.urlToken, { alias: name });
        const token = response.data?.uuid;
        if (!token) {
            throw new Error('Failed to retrieve webhook token');
        }
        const generatedUrl = `${this.urlBase}${token}`;
        return generatedUrl;
    }
}

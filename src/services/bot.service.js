import config from '../../config';
import Client from '../lib/client';

class BotService {
    constructor(client, botId) {
        this.client = client;
        this.botId = botId;
    }

    async  sendIndent(data) {
        try {
            const response = await this.client.create('/intents', {
                botId: this.botId,
                ...data
            });
           return response;

        } catch (error) {
            console.log(error);
        }
    }
}

export default new BotService(new Client({
    baseURL: config.bot.baseUrl,
    headers: {'authorization': config.bot.apiKey}
}), config.bot.botId);
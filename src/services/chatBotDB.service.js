import config from '../../config';
import Client from '../lib/client';

class ChatBotDBService {
    constructor(client, botId) {
        this.client = client;
        this.botId = botId;
    }

    async createConversation(data) {
        try {
            const { message, messageBy } = data;
            return await this.client.create('/conversation', {
                title: message,
                messageBy,
                botId: this.botId
            });
        } catch (error) {
            console.log(error);
        }
    }

    async createMessage(data) {
        try {
            const messageData = [];
            for (const item of data) {
                const {
                    intents = [],
                    conversationId = null,
                    messageBy = 'Bot',
                    message = null
                } = item;
                let messageString = message;
                if(intents && intents.length > 0 ) {
                    const sortedIntents = intents.sort((value1,value2)=> value2.confidence - value1.confidence);
                    messageString = sortedIntents[0].name;
                }
                messageData.push({
                    conversationId,
                    message: messageString,
                    messageBy,
                    intents
                });
            }

            return await this.client.create('/message', messageData);
        } catch (error) {
            console.log(error);
        }
    }


}

export default new ChatBotDBService(new Client({
    baseURL: config.chatDBAPI.baseUrl,
}), config.bot.botId);
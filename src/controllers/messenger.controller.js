import chatBotDB from '../services/chatBotDB.service';
import bot from '../services/bot.service';

class MessengerController {
    async connect(req, res) {
        const { body } = req;
        const { conversation = {}, messages = [] } = await chatBotDB.createConversation(body);
        const { intents = [] } = await bot.sendIndent(body);
        const message = await chatBotDB.createMessage([{
            conversationId: conversation._id,
            intents
        }]);

        messages.push(message);
        res.json({
            conversationId: conversation._id,
            messages

        });
    }

    async send() {
        res.json({send:1});
    }
}

export default new MessengerController;
import chatBotDB from '../services/chatBotDB.service';
import bot from '../services/bot.service';

class MessengerController {
    async connect(req, res) {
        const {body} = req;
        const {conversation = {}, messages = []} = await chatBotDB.createConversation(body);
        const {intents = []} = await bot.sendIndent({
            conversationId: conversation._id,
            message: body.message,
        });
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

    async send(req, res) {
        const {body} = req;
        const {intents = []} = await bot.sendIndent({
            conversationId: body.conversationId,
            message: body.message
        });
        const sendData = [
            {
                conversationId: body.conversationId,
                messageBy: 'User',
                message: body.message
            },
            {
                conversationId: body.conversationId,
                messageBy: 'Bot',
                intents
            }
        ];
        const messages = await chatBotDB.createMessage(sendData);
        res.json({
            conversationId: body.conversationId,
            messages
        });
    }
}

export default new MessengerController;
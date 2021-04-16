import chatBotDB from '../services/chatBotDB.service';
import bot from '../services/bot.service';
import {APP_CONST, STATUS_CODE} from '../utils';

class MessengerController {
    async connect(req, res) {
        try {
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
            }, STATUS_CODE.SUCCESS);
        } catch (error) {
            res.json(error, STATUS_CODE.BAD_REQUEST);
        }

    }

    async send(req, res) {
        try {
            const {body} = req;
            const {intents = []} = await bot.sendIndent({
                conversationId: body.conversationId,
                message: body.message
            });
            const sendData = [
                {
                    conversationId: body.conversationId,
                    messageBy: APP_CONST.MESSAGE_BY_HUMAN,
                    message: body.message
                },
                {
                    conversationId: body.conversationId,
                    messageBy: APP_CONST.MESSAGE_BY_BOT,
                    intents
                }
            ];
            const messages = await chatBotDB.createMessage(sendData);
            res.json({
                conversationId: body.conversationId,
                messages
            }, STATUS_CODE.SUCCESS);
        } catch (error) {
            res.json(error, STATUS_CODE.BAD_REQUEST);
        }

    }
}

export default new MessengerController;
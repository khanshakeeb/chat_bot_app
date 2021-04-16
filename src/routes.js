import messenger from '../src/controllers/messenger.controller';

export default (app)=>{
    app.get('/',(req, res)=>{
        res.json({
            text: 'Rest API server is running...'
        })
    });

    app.post('/api/v1/connect',messenger.connect);
    app.post('/api/v1/send',messenger.send);

};
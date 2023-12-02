
import request from 'request';

export const sendToTelegramBot = async (req,res) => {
   
    let formData = {
        username: req.body.username,
        phoneNumber: req.body.phoneNumber,
        text: req.body.text
    };
        
    await new Promise((resolve, reject) => {
        try {
                    let TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
                    let TELEGRAM_GROUP_ID = process.env.TELEGRAM_GROUP_ID;
        
                    let data = {
                        chat_id: TELEGRAM_GROUP_ID,
                        parse_mode: "HTML",
                        text: `Username: <b>${formData.username}</b>
        Telephone number: <b>${formData.phoneNumber}</b>
        Description: <i>${formData.text}</i>
        `
                    };
                    
                    request({
                        uri: `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
                        method: "POST",
                        json: data
                    }, function(err, res, body) {
                        if (!err) {
                            resolve("done!");
                            reject(err);
                        }
                    });
                    res.status(200).json("Message sended.")
        } catch (e) {
            reject(e);
            res.status(500)
        }
    });
}
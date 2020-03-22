const Message = require('../models/Message');
const cors = require('cors');
const request = require('request');
const { SECRET_KEY } = require('../config.js')

module.exports = app => {
  app.use(cors());

  app.post("/message", async (req, res) => {

    const { name, email, message, captcha } = req.body;

    if(!captcha) {
      console.log("err");
      return res.json({"success": false, "msg": "Capctha is not checked"});
    }

    const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${SECRET_KEY}&response=${captcha}`;

    request(verifyUrl, async (err, response, body) => {

      if(err) {console.log(err); }

      body = JSON.parse(body);

      if (!body.success && body.success === undefined){
          return res.json({"success": false, "msg":"captcha verification failed"});
      }
      else if (body.score < 0.5){
          return res.json({"success": false, "msg":"you might be a bot, sorry!", "score": body.score});
      }
      
      const messageObj = new Message({
        name,
        email,
        message
      });
  
      try {          
        await messageObj.save();
        res.sendStatus(201);
      } catch(err) {
        res.sendStatus(500);
        console.error(err);
      }

    })

    
  });

  
};
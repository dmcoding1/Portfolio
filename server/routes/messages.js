const Message = require('../models/Message');
const cors = require('cors');

module.exports = app => {
  app.use(cors());

  app.post("/message", async (req, res, next) => {

    const { name, email, message } = req.body;

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
  });

  
};
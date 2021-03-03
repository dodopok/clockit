const TelegramBot = require('node-telegram-bot-api');
const token = process.env.TELEGRAM_BOT_KEY;
const bot = new TelegramBot(token, {polling: false});

module.exports = {
  log: function (message) {
    return bot.sendMessage(process.env.TELEGRAM_CHAT_ID, message);
  }
};
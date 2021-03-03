const TelegramBot = require('node-telegram-bot-api');
const token = process.env.TELEGRAM_BOT_KEY;
const bot = new TelegramBot(token, { polling: true });

bot.on('message', (msg) => {
  bot.sendMessage(process.env.TELEGRAM_CHAT_ID, "Ainda tô aqui!");
});

module.exports = {
  log: function (message) {
    return bot.sendMessage(process.env.TELEGRAM_CHAT_ID, message);
  }
};
// const parser = require('cron-parser');
const TelegramBot = require('node-telegram-bot-api');
const token = process.env.TELEGRAM_BOT_KEY;
const bot = new TelegramBot(token, { polling: true });

// const interval = parser.parseExpression(process.env.CRON_RULE);

// const date = require('date-fns');

bot.on('message', (msg) => {
  bot.sendMessage(process.env.TELEGRAM_CHAT_ID, "Ainda tô aqui!");

  // if (msg.text == '/nextrun') {
  //   // let next_run = date.format(
  //   //   interval.next()._date, 
  //   //   "'Dia' dd 'de' MMMM', às ' HH:mm'h'"
  //   // );

  //   console.log(interval.next()._date);

  //   // bot.sendMessage(process.env.TELEGRAM_CHAT_ID, next_run);
  // }
});

module.exports = {
  log: function (message) {
    return bot.sendMessage(process.env.TELEGRAM_CHAT_ID, message);
  }
};
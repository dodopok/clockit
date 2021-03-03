#!/usr/bin/env node

require('dotenv').config();
const cron = require('node-cron');
const exitHook = require('async-exit-hook');

const bot = require('./bot.js');
const clock = require('./clock.js');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; // pra ignorar certificados intermediários ssl não configurados

bot.log("Comecei a rodar!");

exitHook(callback => {
  bot.log(`Douglas, seu código parou de rodar!`).then(callback);
});

// cron as 09 e as 18, de segunda a sexta
// TODO: lidar com feriados e dias exclusivos (férias)

task = cron.schedule('0 9,18 * * 1-5', () => {
  clock.clockit();
}, {
  scheduled: true,
  timezone: "America/Sao_Paulo"
});
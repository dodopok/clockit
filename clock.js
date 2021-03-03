const fetch = require('node-fetch');
const bot = require('./bot.js');

const base_url = process.env.BASE_URL;
const rest_port = process.env.REST_PORT;
const port = process.env.PORT;

const common_headers = {
  "accept": "application/json, text/plain, */*",
  "accept-language": "pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7",
  "content-type": "application/x-www-form-urlencoded",
  "x-totvs-app": "0200"
};

module.exports = {
  clockit: function() {
    fetch(`https://${base_url}:${rest_port}/rest01/auth/login`, {
      "headers": common_headers,
      "referrer": `https://${base_url}:${port}/`,
      "referrerPolicy": "strict-origin-when-cross-origin",
      "body": `user=${process.env.CPF}&password=${process.env.PASSWORD}&redirectUrl=https://${base_url}:${port}/01/`,
      "method": "POST",
      "mode": "cors"
    })
    .then(res => res.text())
    .then(function(body) {
      let regexp = /(?:token=)(.*)(?:&)/;
      let jwt_token = regexp.exec(body)[1];  
    
      fetch(`https://${base_url}:${rest_port}/rest01/timesheet/clockingsGeolocation/%7Bcurrent%7D`, {
        "headers": {...common_headers, ...{"authorization": `Bearer ${jwt_token}`}},
        "referrer": `https://${base_url}:${port}/`,
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": `{\"latitude\":\"${process.env.LATITUDE}\",\"longitude\":\"${process.env.LONGITUDE}\",\"timezone\":180,\"date\":\"${new Date().toISOString()}\",\"hour\":0}`,
        "method": "POST",
        "mode": "cors"
      })
      .then(res => res.text())
      .then(function(body) {
        bot.log('Douglas, acabei de bater seu ponto aqui!');
      });
    });
  }
};
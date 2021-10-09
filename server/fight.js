const Web3 = require('web3');
var moment = require('moment');
var CronJob = require('cron').CronJob;
const TelegramBot = require('node-telegram-bot-api');
const token = '1951972532:AAHdG7NygaxNSvfCRLCfGhNeCprKIypLt7E';
const bot = new TelegramBot(token, {
  polling: true
});

module.exports = {
  async run() {
    var that = this;
    new CronJob('*/5 * * * * *', async function() {
      that.fetchPolygon();
      that.fetchBsc();
    }, null, true, 'America/Los_Angeles').start();
  },

  async fetchPolygon() {
    const provider = "https://matic-mainnet.chainstacklabs.com";
    const web3 = new Web3(new Web3.providers.HttpProvider(provider));
    const POOL_ADDRESS = "0x9aa2f05b70386ffe0a273c757fe02c21da021d62";
    const SIM_DECIMAL = 18;
    const SIM_ABI = require("./abi.json");
    const SIM_ADDRESS = "0x70784d8A360491562342B4F3d3D039AaAcAf8F5D";
    const CONTRACT_SIM = new web3.eth.Contract(SIM_ABI, SIM_ADDRESS);

    async function getBalance() {
      try {
        const result = await CONTRACT_SIM.methods.balanceOf(POOL_ADDRESS).call();
        const format = web3.utils.fromWei(result);
        return format;
      } catch (err) {
        console.log(err);
      }
      return 0;
    }

    var utcMoment = moment.utc();
    var balance = await getBalance();
    var str_balance = "=== <b>Claim SIM NOW</b> === \n";
    str_balance += "Chain: <b>Polygon (Matic)</b> \n";
    str_balance += `Pool balance: <b>${balance}</b> \n`;
    str_balance += `Latest update: <b>${utcMoment.format('HH:mm:ss')}</b> (UTC) \n`;

    if (balance >= 1000) {
      bot.sendMessage(-1001311549874, str_balance, {
        disable_web_page_preview: true,
        disable_notification: false,
        parse_mode: "HTML"
      });
    }
  },

  async fetchBsc() {
    const provider = "https://bsc-dataseed.binance.org/";
    const web3 = new Web3(new Web3.providers.HttpProvider(provider));
    const POOL_ADDRESS = "0xeac4d92dd1436f76750d2964ec8b036dfb47a3ce";
    const SIM_DECIMAL = 18;
    const SIM_ABI = require("./abi.json");
    const SIM_ADDRESS = "0xE4Fba1EC6A3Bf2cF97cB72bC5502d501f6eB80Ad";
    const CONTRACT_SIM = new web3.eth.Contract(SIM_ABI, SIM_ADDRESS);

    async function getBalance() {
      try {
        const result = await CONTRACT_SIM.methods.balanceOf(POOL_ADDRESS).call();
        const format = web3.utils.fromWei(result);
        return format;
      } catch (err) {
        console.log(err);
      }
      return 0;
    }

    var utcMoment = moment.utc();
    var balance = await getBalance();
    var str_balance = "=== <b>Claim SIM NOW</b> === \n";
    str_balance += "Chain: <b>Bsc (Binance Smart Chain)</b> \n";
    str_balance += `Pool balance: <b>${balance}</b> \n`;
    str_balance += `Latest update: <b>${utcMoment.format('HH:mm:ss')}</b> (UTC) \n`;

    if (balance >= 1000) {
      bot.sendMessage(-1001311549874, str_balance, {
        disable_web_page_preview: true,
        disable_notification: false,
        parse_mode: "HTML"
      });
    }
  }
}

const Web3 = require('web3');
const provider = "https://rpc-mainnet.matic.quiknode.pro";

const web3 = new Web3(new Web3.providers.HttpProvider(provider));

const SIM_DECIMAL = 18;
const MONSTER_IN_ONE_MAP = 19;

const BATTLE_ADDRESS = "0x9aA2F05b70386fFe0A273C757fE02C21da021d62";
const BATTLE_ABI = require("./battle_abi.json");
const CONTRACT_BATTLE = new web3.eth.Contract(BATTLE_ABI, BATTLE_ADDRESS);

const POOL_ADDRESS = "0x9aa2f05b70386ffe0a273c757fe02c21da021d62";

var SIM_ABI = require("./abi.json");
const SIM_ADDRESS = "0x70784d8A360491562342B4F3d3D039AaAcAf8F5D";
const CONTRACT_SIM = new web3.eth.Contract(SIM_ABI, SIM_ADDRESS);

var CronJob = require('cron').CronJob;
const TelegramBot = require('node-telegram-bot-api');
const token = 'token_bot';
const bot = new TelegramBot(token, {
  polling: true
});

var moment = require('moment');

const monsterInfo = [{
    name: "Bat",
    coordinates: {
      x: 20,
      y: 32,
    },
    avatar: '/images/battle/monsters/avatars/Bat.png',
    image: '/images/battle/monsters/Bat.gif'
  },
  {
    name: "Boar",
    coordinates: {
      x: 48,
      y: 30,
    },
    avatar: '/images/battle/monsters/avatars/Boar.png',
    image: '/images/battle/monsters/Boar.gif'
  },
  {
    name: "Dinosaur",
    coordinates: {
      x: 73,
      y: 3,
    },
    avatar: '/images/battle/monsters/avatars/Dinosaur.png',
    image: '/images/battle/monsters/Dinosaur.gif'
  },
  {
    name: "Golem",
    coordinates: {
      x: 84,
      y: 40,
    },
    avatar: '/images/battle/monsters/avatars/Golem.png',
    image: '/images/battle/monsters/Golem.gif'
  },
  {
    name: "Ice Golem",
    coordinates: {
      x: 58,
      y: 75,
    },
    avatar: '/images/battle/monsters/avatars/Ice-Golem.png',
    image: '/images/battle/monsters/Ice-Golem.gif'
  },
  {
    name: "Orc",
    coordinates: {
      x: 10,
      y: 60,
    },
    avatar: '/images/battle/monsters/avatars/Orc.png',
    image: '/images/battle/monsters/Orc.gif'
  },
  {
    name: "Skeleton",
    coordinates: {
      x: 8,
      y: 5,
    },
    avatar: '/images/battle/monsters/avatars/Skeleton.png',
    image: '/images/battle/monsters/Skeleton.gif'
  },
  {
    name: "Turtle",
    coordinates: {
      x: 24,
      y: 6,
    },
    avatar: '/images/battle/monsters/avatars/Turtle.png',
    image: '/images/battle/monsters/Turtle.gif'
  },
  {
    name: "Witcher",
    coordinates: {
      x: 34,
      y: 40,
    },
    avatar: '/images/battle/monsters/avatars/Witcher.png',
    image: '/images/battle/monsters/Witcher.gif'
  },
  {
    name: "Wolf",
    coordinates: {
      x: 40,
      y: 20,
    },
    avatar: '/images/battle/monsters/avatars/Wolf.png',
    image: '/images/battle/monsters/Wolf.gif'
  },
  {
    name: "Worm",
    coordinates: {
      x: 5,
      y: 37,
    },
    avatar: '/images/battle/monsters/avatars/Worm.png',
    image: '/images/battle/monsters/Worm.gif'
  },
  {
    name: "Zombie",
    coordinates: {
      x: 80,
      y: 20,
    },
    avatar: '/images/battle/monsters/avatars/Zombie.png',
    image: '/images/battle/monsters/Zombie.gif'
  },
  {
    name: "Ape",
    coordinates: {
      x: 63,
      y: 16,
    },
    avatar: '/images/battle/monsters/avatars/Ape.png',
    image: '/images/battle/monsters/Ape.png'
  },
  {
    name: "Jungle Ghost",
    coordinates: {
      x: 70,
      y: 35,
    },
    avatar: '/images/battle/monsters/avatars/JungleGhost.png',
    image: '/images/battle/monsters/JungleGhost.png'
  },
  {
    name: "MummyBoy",
    coordinates: {
      x: 54,
      y: 5,
    },
    avatar: '/images/battle/monsters/avatars/MummyBoy.png',
    image: '/images/battle/monsters/MummyBoy.png'
  },
  {
    name: "Orc Warrior",
    coordinates: {
      x: 56,
      y: 50,
    },
    avatar: '/images/battle/monsters/avatars/OrcWarrior.png',
    image: '/images/battle/monsters/OrcWarrior.png'
  },
  {
    name: "Quetzacolt",
    coordinates: {
      x: 76,
      y: 79,
    },
    avatar: '/images/battle/monsters/avatars/Quetzacolt.png',
    image: '/images/battle/monsters/Quetzacolt.png'
  },
  {
    name: "Spider",
    coordinates: {
      x: 73,
      y: 55,
    },
    avatar: '/images/battle/monsters/avatars/Spider.png',
    image: '/images/battle/monsters/Spider.png'
  },
  {
    name: "Zombiess",
    coordinates: {
      x: 18,
      y: 78,
    },
    avatar: '/images/battle/monsters/avatars/Zombiess.png',
    image: '/images/battle/monsters/Zombiess.png'
  },
];

module.exports = {
  async run() {
    var that = this;

    var job = new CronJob('*/5 * * * * *', async function() {
      var utcMoment = moment.utc();
      var balance = await that.getBalance();
      var str_balance = "=== <b>Claim SIM NOW</b> === \n";
      str_balance 	 += "Chain: <b>Polygon (Matic)</b> \n";
      str_balance 	 += `Pool amount: <b>${balance}</b> \n`;
      str_balance 	 += `Latest update: <b>${utcMoment.format('HH:mm:ss')}</b> (UTC) \n`;
      str_balance 	 += "Check winning reward: https://t.me/simbarewardfree \n";
      str_balance 	 += "Bot source code: https://github.com/Cra5hs/winning_reward_simba \n";
      str_balance 	 += "Auto claim source code: https://github.com/Cra5hs/bot_claim_simbaempire \n";

      if (balance > 1000) {
        bot.sendMessage(-1001588985231, str_balance, {
          disable_web_page_preview: true,
          disable_notification: false,
          parse_mode: "HTML"
        });
      }

      var monsters = await that.fetchMonsters();
      monsters.sort(function(a, b) {
        return parseInt(a.id) - parseInt(b.id);
      });
      var arrays = [];

      await that.asyncForEach(monsters, async item => {
        const prize = await CONTRACT_BATTLE.methods.getPrize({
          id: item.id,
          cl: item.cl,
          map: 1,
          power: parseInt(item.power * 1000000),
          active: true
        }).call();
        var map = {
          id: item.id,
          power: item.power,
          reward: prize / 1000000,
          name: monsterInfo[parseInt(item.id)].name
        };
        arrays.push(map);
      });


      var str_reward = "=== <b>Winning Rewards</b> === \n";
      str_reward 	+= "Chain: <b>Polygon (Matic)</b> \n";
      str_reward 	+= "Auto Refresh: <b>5 seconds</b> \n";
      str_reward 	+= `Latest update: <b>${utcMoment.format('HH:mm:ss')}</b> (UTC) \n`;
      str_reward 	+= "Check pool 4 claim: https://t.me/simbapoolreward \n";
      str_reward 	+= "Auto claim source code: https://github.com/Cra5hs/bot_claim_simbaempire \n";
      str_reward 	+= "Bot source code: https://github.com/Cra5hs/winning_reward_simba \n";
      str_reward 	+= "============== \n";
      arrays.forEach((item, i) => {
      str_reward    += `⚠️ <b>${item.name}</b> - <b>${item.reward}</b> SIM \n`;
      });

      bot.sendMessage(-1001522177782, str_reward, {
        disable_web_page_preview: true,
        disable_notification: true,
        parse_mode: "HTML"
      });
    }, null, true, 'America/Los_Angeles');
    job.start();


  },

  cryptoConvert(type, amount, decimals, ) {
    if (type === 'decode') {
      return (amount) / +("1" + new Array(+decimals).fill(0).toString().replace(/,/g, ''));
    }
    const scale = +decimals - (amount.toString().split('.')[1].length || 0);
    let output = amount.toString();
    for (let i = 0; i < scale; i++) output += '0';
    output = output.replace('.', '');
    if (output[0] === "0") output = output.slice(1, output.length)
    return output;
  },

  async fetchMonsters() {
    const monsterFightLimitPerDay = await CONTRACT_BATTLE.methods.monsterFightLimitPerDay().call();
    const data = await CONTRACT_BATTLE.methods.getMonsters().call();
    const monsterRaws = this.getMonsterMaps(data);
    return monsterRaws;
  },

  getMonsterMaps(rawData) {
    const totalMaps = Math.ceil(rawData.length / MONSTER_IN_ONE_MAP);

    var that = this;
    if (rawData.length < MONSTER_IN_ONE_MAP) {
      return rawData.filter(e => e.active).map(e => {
        return {
          id: e.id,
          cl: e.cl,
          power: that.cryptoConvert('decode', e.power, 18),
          active: e.active,
          fightCount: e.fightCount
        };
      });
    }

    let i, j, monsterRaw = [],
      maps = [];
    for (i = 0, j = rawData.length; i < j; i += MONSTER_IN_ONE_MAP) {
      const array = rawData.slice(i, i + MONSTER_IN_ONE_MAP);
      maps.push(array);
    }

    let currentMap = DateTimeUtils.getRangeHour(new Date().getHours(), 7, 4);

    if (maps[currentMap - 1]) monsterRaws = maps[currentMap - 1];

    else {
      currentMap = 1;
      monsterRaws = maps[0];
    }


    return monsterRaws.filter(e => e.active).map(e => {
      return {
        id: e.id,
        cl: e.cl,
        power: that.cryptoConvert('decode', e.power, 18),
        active: e.active,
        fightCount: e.fightCount
      };
    });
  },

  async asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array)
    }
  },


  async getBalance() {
    try {
      const result = await CONTRACT_SIM.methods.balanceOf(POOL_ADDRESS).call();
      const format = web3.utils.fromWei(result);
      return format;
    } catch (err){ console.log(err);}
    return 0;
  }
}

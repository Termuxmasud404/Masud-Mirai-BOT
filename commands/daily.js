module.exports = {
  description: 'Claim daily reward',
  async execute({ msg, db, saveDb, config }){
    const uid = msg.senderId;
    if (!db.users[uid]) db.users[uid] = { balance: config.startingBalance||100, items: [] };
    const now = Date.now();
    const last = db.users[uid].lastDaily || 0;
    if (now - last < 86400000) return msg.reply('You already claimed today. Come back later.');
    const amt = config.dailyReward||50;
    db.users[uid].balance = (db.users[uid].balance||0) + amt;
    db.users[uid].lastDaily = now;
    saveDb();
    msg.reply(`🎉 Daily +${amt} ${config.currencyName}. Balance: ${db.users[uid].balance}`);
  }
};

module.exports = {
  description: 'Balance commands',
  async execute({ msg, args, db, saveDb, config }){
    const uid = msg.senderId;
    if (!db.users[uid]) db.users[uid] = { balance: config.startingBalance||100, items: [] };
    if (args[0] === 'give'){
      const to = args[1];
      const amt = parseInt(args[2],10)||0;
      if (!to || amt<=0) return msg.reply('Usage: !balance give <uid> <amount>');
      if (db.users[uid].balance < amt) return msg.reply('Insufficient balance');
      if (!db.users[to]) db.users[to] = { balance:0, items: [] };
      db.users[uid].balance -= amt;
      db.users[to].balance += amt;
      saveDb();
      return msg.reply(`✅ Sent ${amt} ${config.currencyName} to ${to}. Your balance: ${db.users[uid].balance}`);
    }
    return msg.reply(`💰 Your balance: ${db.users[uid].balance}`);
  }
};

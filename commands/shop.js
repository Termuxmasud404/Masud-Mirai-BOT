module.exports = {
  description: 'Simple shop',
  async execute({ msg, args, db, saveDb, config }){
    const uid = msg.senderId;
    if (!db.users[uid]) db.users[uid] = { balance: config.startingBalance||100, items: [] };
    const items = { namecard:{price:50,desc:'Custom namecard'}, vip:{price:300,desc:'VIP role (fun)'} };
    if (!args[0] || args[0]==='list'){
      const list = Object.entries(items).map(([k,v])=>`${k} - ${v.price} ${config.currencyName} - ${v.desc}`).join('\n');
      return msg.reply('🛒 Shop items:\n'+list);
    }
    if (args[0]==='buy'){
      const it = args[1];
      if (!items[it]) return msg.reply('Item not found');
      if (db.users[uid].balance < items[it].price) return msg.reply('Insufficient balance');
      db.users[uid].balance -= items[it].price;
      db.users[uid].items.push(it);
      saveDb();
      return msg.reply(`✅ You bought ${it}. Balance: ${db.users[uid].balance}`);
    }
    msg.reply('Usage: !shop list | !shop buy <item>');
  }
};

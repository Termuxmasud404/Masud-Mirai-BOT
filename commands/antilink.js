module.exports = {
  description: 'Anti-link (toggleable)',
  async execute({ msg, args, config, db, saveDb, isAdmin }){
    if (isAdmin && args[0] === 'toggle'){ config.antiLink = !config.antiLink; require('fs').writeFileSync('./config.json', JSON.stringify(config,null,2)); return msg.reply('AntiLink ' + (config.antiLink?'ON':'OFF')); }
    if (!isAdmin){ // punitive action simulation
      db.users[msg.senderId] = db.users[msg.senderId] || { balance: config.startingBalance||100, warns:0 };
      db.users[msg.senderId].warns = (db.users[msg.senderId].warns||0) + 1;
      saveDb();
      return msg.reply('Links are not allowed here. Warning issued.');
    }
    msg.reply('Admin link; no action.');
  }
};

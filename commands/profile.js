module.exports = {
  description: 'Show user profile',
  async execute({ msg, db }){
    const uid = msg.senderId;
    const user = db.users[uid] || { balance: 0, items: [] };
    msg.reply(`👤 UID: ${uid}\nBalance: ${user.balance || 0}\nItems: ${(user.items||[]).join(', ') || 'None'}`);
  }
};

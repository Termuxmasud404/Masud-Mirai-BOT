const fs = require('fs');
module.exports = {
  description: 'Admin utilities',
  async execute({ msg, args, config }){
    if (!config.admins.includes(msg.senderId)) return msg.reply('Admin only');
    const sub = args[0] || 'help';
    if (sub === 'restart') { msg.reply('Restarting...'); process.exit(0); }
    if (sub === 'setadmin'){ const uid = args[1]; if(!uid) return msg.reply('UID required'); config.admins.push(uid); fs.writeFileSync('./config.json', JSON.stringify(config,null,2)); return msg.reply('Admin added'); }
    msg.reply('Admin subcommands: restart, setadmin <uid>'); 
  }
};

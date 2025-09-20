const fs = require('fs');
const path = require('path');
const config = require('./config.json');

// Simple logger (placeholder)
function log(...args){ console.log('[Masud-Bot]', ...args); }

// Load commands
const commands = new Map();
const commandFiles = fs.readdirSync(path.join(__dirname,'commands')).filter(f => f.endsWith('.js'));
for(const file of commandFiles){
  const cmd = require(`./commands/${file}`);
  const name = path.basename(file, '.js');
  commands.set(name, cmd);
  log('Loaded command', name);
}

// Simple DB (JSON file)
const dbPath = './db.json';
let db = { users: {} };
if (fs.existsSync(dbPath)) {
  try { db = JSON.parse(fs.readFileSync(dbPath,'utf8')); } catch(e){ log('Failed to parse db.json, using empty DB'); }
}
function saveDb(){ fs.writeFileSync(dbPath, JSON.stringify(db, null, 2)); }

// Cooldown system
const cooldowns = new Map();
function applyCooldown(uid, cmd){
  const expiry = Date.now() + (config.cooldownSeconds||3)*1000;
  const user = cooldowns.get(uid) || {};
  user[cmd] = expiry;
  cooldowns.set(uid, user);
}
function checkCooldown(uid, cmd){
  const user = cooldowns.get(uid) || {};
  const exp = user[cmd] || 0;
  if (Date.now() < exp) return Math.ceil((exp - Date.now())/1000);
  return 0;
}

// Placeholder message object for test/demo usage
function makeMsg(senderId, text){
  return {
    senderId, text,
    reply: (t) => { console.log(`-> Reply to ${senderId}: ${t}`); }
  };
}

// Main message handler - integrate with Mirai event in real bot
async function onMessage(msg){
  if(!msg || !msg.text) return;
  // Anti-link check
  if (config.antiLink && /https?:\/\//i.test(msg.text) && !msg.text.startsWith(config.prefix)){
    const antilink = commands.get('antilink');
    if (antilink) return antilink.execute({ msg, config, db, saveDb, isAdmin: config.admins.includes(msg.senderId) });
  }
  if (!msg.text.startsWith(config.prefix)) return;
  const parts = msg.text.slice(config.prefix.length).trim().split(/\s+/);
  const cmdName = parts.shift().toLowerCase();
  const args = parts;
  if (!commands.has(cmdName)) return msg.reply('Unknown command. Use !help');
  const remaining = checkCooldown(msg.senderId, cmdName);
  if (remaining>0) return msg.reply(`Please wait ${remaining}s before using this command again.`);
  applyCooldown(msg.senderId, cmdName);
  const cmd = commands.get(cmdName);
  try{
    await cmd.execute({ msg, args, config, db, saveDb, isAdmin: config.admins.includes(msg.senderId) });
  }catch(e){
    console.error(e);
    msg.reply('Error running command.');
  }
}

// Simple demo runner (console)
if (require.main === module){
  log('Masud Mirai-style scaffold started. Type commands like: !help');
  const stdin = process.openStdin();
  stdin.addListener('data', d => {
    const line = d.toString().trim();
    if (!line) return;
    // simulate user 100000119417239
    onMessage(makeMsg(config.owner, line));
  });
}
module.exports = { onMessage, saveDb, db };

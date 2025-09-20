module.exports = {
  description: 'Pair users (fun)',
  async execute({ msg, args }){
    if (args.length<2) return msg.reply('Usage: !pair @a @b');
    const a = args[0].replace('@',''), b = args[1].replace('@','');
    const score = Math.floor(Math.random()*101);
    msg.reply(`💞 ${a} + ${b} = ${score}% compatibility`);
  }
};

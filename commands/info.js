module.exports = {
  description: 'Bot info',
  async execute({ msg, config }){
    msg.reply(`🤖 Masud Bot (Professional scaffold)\nPrefix: ${config.prefix}\nOwner: ${config.owner}`);
  }
};

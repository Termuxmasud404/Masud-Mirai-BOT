module.exports = {
  description: 'Propose (fun)',
  async execute({ msg, args }){
    const target = args[0] || 'someone';
    const replies = ['She said: Yes! 🎉','She said: No 💔','She said: Think about it 🤔','She said: LOL 😂'];
    msg.reply(`${target}, you have a proposal!\nResponse: ${replies[Math.floor(Math.random()*replies.length)]}`);
  }
};

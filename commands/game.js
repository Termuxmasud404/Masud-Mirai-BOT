module.exports = {
  description: 'Games: rps',
  async execute({ msg, args }){
    if (args[0] !== 'rps') return msg.reply('Usage: !game rps <rock|paper|scissors>');
    const choice = args[1];
    if (!['rock','paper','scissors'].includes(choice)) return msg.reply('Choose rock/paper/scissors');
    const opts = ['rock','paper','scissors'];
    const botChoice = opts[Math.floor(Math.random()*3)];
    let result = 'Draw';
    if (choice === botChoice) result = 'Draw';
    else if ((choice==='rock'&&botChoice==='scissors')||(choice==='paper'&&botChoice==='rock')||(choice==='scissors'&&botChoice==='paper')) result='You win';
    else result='You lose';
    msg.reply(`You: ${choice}\nBot: ${botChoice}\nResult: ${result}`);
  }
};

module.exports = {
  description: 'Show help',
  async execute({ msg, args, config }){
    const cmds = [
      "help - Show this message",
      "info - Bot info",
      "profile - Show profile",
      "balance - Show balance / transfer",
      "daily - Claim daily reward",
      "shop - Shop list/buy",
      "leaderboard - Top balances",
      "game rps - Rock Paper Scissors",
      "pair @a @b - Compatibility",
      "propose @user - Fun propose",
      "hack - Fake hack (fun)",
      "admin - Admin subcommands"
    ];
    msg.reply("✨ Available commands:\n" + cmds.join('\n'));
  }
};

module.exports = {
  description: 'Fake hack simulator (fun)',
  async execute({ msg, args }){
    const target = args[0] || msg.senderId;
    const steps = ['Connecting...','Cracking 32%...','Cracking 78%...','Password found: 123456 (fake)','Done (simulation)'];
    for(const s of steps){ await new Promise(r=>setTimeout(r,600)); msg.reply(s); }
  }
};

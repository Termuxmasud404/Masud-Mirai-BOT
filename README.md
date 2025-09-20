# Masud - Mirai-style Professional Bot (Scaffold)

This repository is a professional scaffold for a Mirai-style Messenger bot.
It is intended as a starter template you can customize and deploy.

## Features included
- Command handler (commands/ folder)
- Config file with owner/admin list
- Economy system (balance, daily, shop, leaderboard)
- Games (RPS)
- Moderation simulation (ban/mute)
- Anti-link, cooldown, logging placeholder
- .gitignore and run script

## Important
- **Do NOT** add your `fbstate.json` or any secrets to the repo. Add them locally and add `fbstate.json` to .gitignore (already included).
- Replace `config.json` values (owner/admin UIDs) before running.

## Quick start
```bash
npm install
# copy fbstate.json to project root (do NOT commit it)
node index.js
```

## License
MIT

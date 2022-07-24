process.stdout.write("\u001b[3J\u001b[2J\u001b[1J"); console.clear();

const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const { token } = require('./config.json');

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  const guild = client.guilds.cache.get('1000606638765514913');
  let commands;

  // "Commands holds the application commands manager for either the guild or the whole bot"
  if (guild) {
    commands = guild.commands
  } else {
    commands = client.application.commands
  }

  commands.create({
    name: 'ping',
    description: 'Pong!',
  })
});

client.on('interactionCreate', async (interaction) => {
  // Check if interaction is a slash command
  if (!interaction.isChatInputCommand()) return;
  const { commandName, options } = interaction

  if (commandName == 'ping') {
    interaction.reply({
      content: 'Pong!',
      ephemeral: true
    })
  }
})

client.login(token);
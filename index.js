process.stdout.write("\u001b[3J\u001b[2J\u001b[1J"); console.clear();

const { Client, GatewayIntentBits, ApplicationCommandOptionType } = require('discord.js');
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

  commands.create({
    name: 'add',
    description: 'Adds two numbers',
    options: [
      {
        name: 'num1',
        description: 'The first number',
        required: true,
        type: ApplicationCommandOptionType.Number
      },
      {
        name: 'num2',
        description: 'The second number',
        required: true,
        type: ApplicationCommandOptionType.Number
      }
    ]
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

  if (commandName == 'add') {
    let num1 = options.getNumber('num1')
    let num2 = options.getNumber('num2')

    await interaction.deferReply({
      ephemeral: true
    })

    await new Promise(resolve => setTimeout(resolve, 5000))

    interaction.editReply({
      content: `The sum is ${num1 + num2}`,
    })
  }
})

client.login(token);
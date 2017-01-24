const fs = require("fs");

exports.run = (bot, msg, params) => {
   if(msg.author.id != "213251218154192896") return;
  if (params[0] === "all") {
    bot.log("Reloading all commands");
    bot.functions.core.loadCommands(bot);
    return;
  }
  let command;
  if (bot.commands.has(params[0])) {
    command = params[0];
  } else if (bot.aliases.has(params[0])) {
    command = bot.aliases.get(params[0]);
  }
  if (!command) {
    if (params[0].includes(".js")) params[0] = params[0].replace(".js","");
    fs.stat(`./cmds/${params[0]}.js`, (err, stats) => {
      if (err) return msg.channel.sendMessage(`I cannot find the command: ${params[0]}`);
      if (stats.isFile()) {
        msg.channel.sendMessage(`Loading New Command: ${params[0]}`)
        .then(m => {
          bot.functions.core.reload(bot, params[0])
          .then(() => {
            m.edit(`Successfully Loaded: ${params[0]}`);
          })
          .catch(e => {
            m.edit(`Command load failed: ${params[0]}\n\`\`\`${e.stack}\`\`\``);
          });
        });
      }
    });
  } else {
    msg.channel.sendMessage(`Reloading: ${command}`)
    .then(m => {
      bot.functions.core.reload(bot, command)
      .then(() => {
        m.edit(`Successfully reloaded: ${command}`);
      })
      .catch(e => {
        m.edit(`Command reload failed: ${command}\n\`\`\`${e.stack}\`\`\``);
      });
    });
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["r", "enable"],
  permLevel: 4,
  botPerms: []
};

exports.help = {
  name: "reload",
  description: "Reloads the command file, if it's been updated or modified.",
  usage: "reload <commandname>"
};
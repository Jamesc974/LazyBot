const Discord = require("discord.js");
exports.run = (bot, msg, params = []) => {
	 if (!params[0]) {
   msg.author.sendMessage("__**LazyBot NationStates Commands**__ \n  **//nat <nation name>** gives a bunch of nation info, type **//more <nation name>** for more nation info \n **//reg <region name>** gives info about a region \n");
	msg.author.sendMessage("__**LazyBot Commands**__ \n	 **//invite** sends the url to invite this bot to your server \n **//testserv** sends an invite to my Bot HQ \n **//suggest** leave me a suggestion! \n **//stats** gives all kinds of stats \n **//ping** Pong! \n **//wiki <input>** gives the wikipedia page of the input if it is valid \n **//funny** gives a random Cyanide & Happiness Comic \n **//serverinfo** gives info about the server \n **//news** will ask for a news outlet and will give the top four headlines \n **//clock** gives a world clock \n **//reddit** allows you to search a subreddit and get the 5 newest posts \n");
	msg.author.sendMessage("__**LazyBot Admin Commands**__ \n *Requires manage server, manage roles, and manage members permissions!* \n  **//kick <mention a user>** Kicks the mentioned user, only works if the kicker has kick member perms \n **//addrole <metion user> <role name>** Adds the given role to the mentioned user \n **//removerole <mention user> <role name>** same as //addrole but removes it");
      msg.reply("Help has arrived! Check your DMs!");
  } else {
  let command = params[0];
  if(bot.commands.has(command)) {
    command = bot.commands.get(command);
	  const embed = new Discord.RichEmbed();
  
  embed.setColor(0x161370)
     
.addField(`Help for ${command.help.name}`, `${command.help.description}`)
	  .addField(`Usage`, "`" + "//" + command.help.usage + "`")
    msg.channel.sendEmbed(embed);
}
}
};

exports.conf = {
  enabled: true, // not used yet
  guildOnly: false, // not used yet
  aliases: [],
  permLevel: 0 // Permissions Required, higher is more power
};

exports.help = {
  name : "help",
  description: "Gives a list of commands!",
  usage: "help"
};

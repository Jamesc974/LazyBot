//LazyBot, by Melorian Republic
const Discord = require("discord.js");
const bot = new Discord.Client();
const prefix = ".";
const fs = require("fs");
var request = require('superagent');
var parseString = require('xml2js').parseString;
var xml2js = require('xml2js');
const moment = require('moment');
require("moment-duration-format");
var TOKEN = process.env.TOKEN;
bot.on("ready", () => {
   	bot.user.setGame(".help | .invite");
  	console.log("I am ready!");
});

bot.on("message", msg => {
	if (msg.content.startsWith(prefix + "nat")){
        const embed = new Discord.RichEmbed();
  const args = msg.content.split(" ").slice(1);
  const name = args.join("_");

  const now = new Date();
  const date = moment(now).format("MMM/DD/YYYY"); //This is better. 
  const time = moment(now).format("H:mm:ss");
  const result = request.get(`https://www.nationstates.net/cgi-bin/api.cgi?nation=${name}&q=name+gdp+population+region+wa+flag+fullname+influence+census;mode=score;scale=66`);

  result.then((res) => {
    parseString(res.text, (err, obj) => {
      embed.setColor(3447003)
        .setAuthor(`${obj.NATION.NAME}`, `${obj.NATION.FLAG}`)
        .setTitle(`Nation Info for ${obj.NATION.NAME}`)
        .setDescription(obj.NATION.FULLNAME)
        .setThumbnail(`${obj.NATION.FLAG}`)
        .addField('Region', obj.NATION.REGION, true)
        .addField('Influence', obj.NATION.INFLUENCE, true)
        .addField('Population', obj.NATION.POPULATION * 10000000, true)
        .addField('Economy', "$" + obj.NATION.GDP, true)
        .addField('WA Status?', obj.NATION.UNSTATUS, true)
        .addField('Endorsement Count', Math.round(obj.NATION.CENSUS[0].SCALE[0].SCORE), true)
	.addField('Link', "http://www.nationstates.net/nation=" + args)
        .setFooter(`Generated on ${date} at ${time}. For more extensive information, type .more <nation name>`)
      msg.channel.sendEmbed(embed);
    })
  })
} else if(msg.content.startsWith(prefix + "reg")){
  const embed = new Discord.RichEmbed();
  const args = msg.content.split(" ").slice(1);
  const name = args.join("_");
  const now = new Date();
  const date = moment(now).format("MMM/DD/YYYY");
  const time = moment(now).format("H:mm:ss");
  const result = request.get(`https://nationstates.net/cgi-bin/api.cgi?region=${name}&q=founder+name+numnations+power+tags+flag+delegate`);
  result.then((res) => {
    parseString(res.text, (err, obj) => {
      embed.setColor(3447003)
      .setAuthor(obj.REGION.NAME, `${obj.REGION.FLAG}`)
      .setTitle(`Region Info for ${obj.REGION.NAME}`)
      .setDescription(`wew lad`)
      .setThumbnail(`${obj.REGION.FLAG}`)
      .addField(`Founder`, obj.REGION.FOUNDER, true)
      .addField(`Number of Nations`, obj.REGION.NUMNATIONS, true)
      .addField(`Power`, obj.REGION.POWER, true)
      .addField(`WA Delegate`, obj.REGION.DELEGATE, true)
      .addField(`Link`, "https://www.nationstates.net/region=" + args)
      .setFooter(`Generated on ${date} at ${time}`)
      msg.channel.sendEmbed(embed);
    })
  })
} else if(msg.content.startsWith(prefix + "world")){
  const embed = new Discord.RichEmbed();
  const now = new Date();
  const date = moment(now).format("MMM/DD/YYYY");
  const time = moment(now).format("H:mm:ss");
  const result = request.get(`https://nationstates.net/cgi-bin/api.cgi?q=numregions+numnations+featuredregion`);
  result.then((res) => {
    parseString(res.text, (err, obj) => {
      embed.setColor(3447003)
      .setAuthor('World Statistics', bot.user.avatarURL)
      .setTitle('NationStates.net')
      .setDescription('wew lad')
      .setThumbnail(bot.user.avatarURL)
      .addField('Number of Regions', obj.WORLD.NUMREGIONS, true)
      .addField('Number of Nations', obj.WORLD.NUMNATIONS, true)
      .addField('Today\'s Featured Region', obj.WORLD.FEATUREDREGION)
      .setFooter(`Generated on ${date} at ${time}`)
      msg.channel.sendEmbed(embed);
    })
  })
} else if(msg.content.startsWith(prefix + "more")){
  const embed = new Discord.RichEmbed();
  const args = msg.content.split(" ").slice(1);
  console.log(args);
  const name = args.join("_");
  const now = new Date();
  const date = moment(now).format("MMM/DD/YYYY");
  const time = moment(now).format("H:mm:ss");
  const result = request.get(`https://nationstates.net/cgi-bin/api.cgi?nation=${name}&q=name+govtpriority+income+lastactivity+leader+tax+capital+category+flag+fullname+majorindustry`);
  result.then((res) => {
    parseString(res.text, (err, obj) => {
      embed.setColor(3447003)
      .setAuthor(`${obj.NATION.NAME}`, `${obj.NATION.FLAG}`)
      .setTitle('More Nation Stats')
      .setDescription(`${obj.NATION.FULLNAME}`)
      .setThumbnail(`${obj.NATION.FLAG}`)
      .addField('Category', obj.NATION.CATEGORY, true)
      .addField('Government Priority', obj.NATION.GOVTPRIORITY, true)
      .addField('Major Industry', obj.NATION.MAJORINDUSTRY, true)
      .addField('Leader', obj.NATION.LEADER, true)
      .addField('Capital', obj.NATION.CAPITAL, true)
      .addField('Tax', obj.NATION.TAX, true)
      .addField('Average Income', obj.NATION.INCOME, true)
      .addField('Last Activity', obj.NATION.LASTACTIVITY, true)
      .setFooter(`Generated on ${date} at ${time}`)
      msg.channel.sendEmbed(embed);
    })
  })
}
       
     else if(msg.content.startsWith(prefix + "help")){
    	msg.channel.sendMessage("```" + "LazyBot Commands: \n .nat <nation name> gives a bunch of nation info, type .more <nation name> for more nation info \n .reg <region name> gives info about a region \n .desc <nation name> \n .rphelp brings up a list of RP commands \n .invite sends the url to invite this bot to your server \n .testserv sends an invite to my Bot HQ \n .suggest Leave me a suggestion! \n" + "```" );
    } else if(msg.content === "RIP"){
    	msg.channel.sendMessage("Yeah, RIP");
    } else if(msg.content === "Hail Satan"){
    	msg.channel.sendFile("https://media2.giphy.com/media/77f2SrKYNOnYs/200_s.gif");
    } else if(msg.content.startsWith(prefix + "info")){
    	msg.channel.sendMessage("```This bot is run by Melorian Republic, and was written in Javascript!```");
    } else if(msg.content.startsWith(prefix + "industry")){
    	let inputfour = msg.content.split(" ").slice(1);
    	var namefive = inputfour.join("_");
    	console.log(namefive);
    	request.get('https://www.nationstates.net/cgi-bin/api.cgi?nation=' + namefive + '&q=majorindustry').end((err, res) => {
    		console.log(res.text);
    		var xml = res.text;
    		var stripped = xml.replace(/(<([^>]+)>)/ig,"");
    		console.log(stripped);
    		msg.channel.sendMessage(namefive + "'s Major Industry: " + stripped);
    	});
    } 
    else if(msg.content.startsWith(prefix + "desc")){
    	let input = msg.content.split(" ").slice(1);
    	var name = input.join("_");
    	request.get('https://www.nationstates.net/cgi-bin/api.cgi?nation=' + name + '&q=industrydesc').end((err, res) => {
    		console.log(res.text);
    		var xml = res.text;
    		var stripped = xml.replace(/(<([^>]+)>)/ig,"");
    		console.log(stripped);
    		msg.channel.sendMessage(stripped);
    	});
    } else if (msg.content.startsWith(prefix + "TVT")){
    	let number = msg.guild.roles.find("name", "TVT Partisan").members.size;
    	msg.channel.sendMessage("There are " + number + " TVT Partisans here!");
    }  else if(msg.content=== (prefix + "rollone")){
        var diceOne  = Math.floor( Math.random() * 20) + 1;
        console.log(diceOne);
        msg.channel.sendMessage(diceOne);
    } else if (msg.content=== (prefix + 'rolltwo')){
        var diceOne = Math.floor( Math.random() * 20) + 1;
        var diceTwo = Math.floor(Math.random() * 20) + 1;
        console.log(diceOne);
        console.log(diceTwo);
        msg.channel.sendMessage(diceOne + " | " + diceTwo);
    }  else if (msg.content=== (prefix + "CTSN")){
        let number = msg.guild.roles.find("name", "CTSN Member").members.size;
        msg.channel.sendMessage("There are " + number + " CTSN Members here!");
    } else if (msg.content=== (prefix + "USSD")){
        let numberone = msg.guild.roles.find("name", "USSD Member").members.size;
        msg.channel.sendMessage("There are " + numberone + " USSD Members here!");
    } else if (msg.content.startsWith(prefix + "armysize")){
        let args = msg.content.split(" ").slice(1);
        var name = args.join("_");""
        console.log(name);
        request.get('https://www.nationstates.net/cgi-bin/api.cgi?nation=' + name + '&q=population').end((err, res) => {
            //if(err) throw err;
            console.log(res.text);
            //var xml = res.text;
            var numbero = res.text.replace(/(<([^>]+)>)/ig,"");
            console.log(numbero);
            var size = (numbero * 1000000);
            console.log(size);
            var final = size * .05;
            console.log(final);
            var endresult = final.toLocaleString();
            console.log(endresult);
            msg.channel.sendMessage("Army Size: " + endresult);
        
            
        });
        
        
    } else if(msg.content === (prefix + "Exodus")){
        let numbertwo = msg.guild.roles.find("name", "Exodus Member").members.size;
        msg.channel.sendMessage("There are " + numbertwo + " Exodus members here!");
    } else if(msg.content === (prefix + "mods")){
        msg.channel.sendMesage("```" + "Our mods: Siberia, Vetelo, Melorian Republic, NuclearWaste123, and New Vapaus!" + "```");
    } else if(msg.content === (prefix + "rphelp")){
        msg.channel.sendMessage("```\nList of RP Commands:\n .rollone \n .rollTwo \n" + "```");
    } else if(msg.content.startsWith(prefix + "invite")){
        msg.reply("Invite me to your server! https://discordapp.com/oauth2/authorize?client_id=259784917339078656&scope=bot&permissions=0");
    } else if(msg.content.startsWith(prefix + "testserv")){
        msg.reply("Come to my server! https://discord.gg/TmQQddz");
    } else if(msg.content.startsWith( prefix + "suggest")){
        let args = msg.content.split(" ").splice(1);
        console.log(args);
        var output = args.join(" ");
        console.log(output);
        bot.channels.get("264845260339806211").sendMessage("```\n" + output + "\n```");
    } 
 
});

process.on("unhandledRejection", err => {
    console.error(`Uncaught Promise Error: \n + ${err.stack}`);
});

bot.on('guildCreate', Guild => {
  let toSend = [
 "\:white_check_mark: I've been invited to this server: " + Guild.name,
  "Guild ID: " + Guild.id,
  "Guild Members Count: " + Guild.memberCount,
  "Guild Region: " + Guild.region
];

bot.channels.get("263423925017378816").sendMessage(toSend);
});


bot.on('guildMemberAdd', member => {
    var msg;
    msg = `Welcome ${member} to ${member.guild.name}`;
    bot.channels.get("264792406694559745").sendMessage(msg);
});
bot.on('guildMemberRemove', member => {
    var msg; 
    msg = `See ya later ${member}!`;
    bot.channels.get("264792406694559745").sendMessage(msg);
});


bot.login(TOKEN);

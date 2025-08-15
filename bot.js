// Demon Development Çoklu Ses Botu Buraları Ellemeyiniz
const { Client, GatewayIntentBits, ActivityType } = require('discord.js');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates] });

const token = process.env.TOKEN;
const guildId = process.env.GUILD_ID;
const voiceChannelId = process.env.VOICE_CHANNEL_ID;
const activityType = process.env.ACTIVITY_TYPE || "LISTENING";
const activityName = process.env.ACTIVITY_NAME || "Bir şeyler";

const typeMap = {
  PLAYING: ActivityType.Playing,
  STREAMING: ActivityType.Streaming,
  LISTENING: ActivityType.Listening,
  WATCHING: ActivityType.Watching,
  COMPETING: ActivityType.Competing
};

client.once('ready', async () => {
  console.log(`${client.user.tag} aktif!`);


  client.user.setActivity(activityName, { type: typeMap[activityType] });

  const guild = client.guilds.cache.get(guildId);
  if (!guild) return console.log("Sunucu bulunamadı.");

  const channel = guild.channels.cache.get(voiceChannelId);
  if (!channel || !channel.isVoiceBased()) return console.log("Ses kanalı bulunamadı veya geçersiz.");

  try {
    await channel.join(); 
    console.log("Ses kanalına bağlandı!");
  } catch (e) {
    console.log("Ses kanalına bağlanırken hata:", e);
  }
});

client.login(token);

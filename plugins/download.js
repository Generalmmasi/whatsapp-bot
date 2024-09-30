const { bot, Mode, getJson, postJson, toAudio, toPTT } = require('../lib');
bot(
 {
  pattern: 'spotify ?(.*)',
  fromMe: Mode,
  desc: 'Downloads Spotify Music',
  type: 'download',
 },
 async (message, match, m, client) => {
  if (!match || !match.includes('spotify.com')) return await message.sendReply('*_Provide a valid Spotify link!_*');
  const res = await getJson('https://giftedapis.us.kg/api/download/spotifydl?url=' + encodeURIComponent(match.trim()) + '&apikey=gifted');
  const msg = await message.reply('*_Downloading ' + res.data.title + '_*');
  const audio = await toAudio(res.preview);
  await msg.edit(`*_Download Success_*\n*Song Name: ${res.data.title}*\n*Duration: ${res.data.duration}*`);
  return await message.send(audio, { quoted: message });
 }
);

bot(
 {
  pattern: 'fb ?(.*)',
  fromMe: Mode,
  desc: 'Downloads Facebook Videos | Reels',
  type: 'download',
 },
 async (message, match, m, client) => {
  if (!match || !match.includes('facebook.com')) return await message.sendReply('*_Provide Vaild Facebook Url_*');
  const res = await getJson('https://api.guruapi.tech/fbvideo?url=' + encodeURIComponent(match.trim() + ''));
  const msg = await message.reply('*_Downloading ' + res.result.title + '_*');
  await msg.react('⬇️');
  await msg.edit('*_Download Success_*');
  await message.send(res.result.hd, { caption: res.result.title, quoted: msg });
  return await msg.react('✅');
 }
);

bot(
 {
  pattern: 'insta',
  fromMe: Mode,
  desc: 'Downloads Instagram Videos Only!',
  type: 'download',
 },
 async (message, match, m, client) => {
  if (!match || !match.includes('instagram.com')) return await message.sendReply('*_Provide Vaild Instagram Url_*');
  const msg = (await message.reply('_Downloading_')) && message.react('⬇️');
  const res = await getJson(`https://api.guruapi.tech/insta/v1/igdl?url=${encodeURIComponent(match.trim())}`);
  if (res) {
   (await msg.edit('_Download Success_')) && msg.react('✅');
   return await message.send(res.media[0].url);
  } else {
   return await message.sendMessage(message.chat, '```Error From API```');
  }
 }
);
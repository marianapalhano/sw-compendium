const axios = require('axios')

const api = axios.create({
    baseURL: 'https://swapi.dev/api/'
});

require('dotenv').config()
const token = process.env.BOT_TOKEN
const prefix = process.env.PREFIX

const Discord = require('discord.js')
const intents = new Discord.Intents(32767)
const client = new Discord.Client({ intents })

client.on('ready', () => {
    console.log('our bot is ready to go')
})

client.on('messageCreate', msg => {
    if (!msg.content.startsWith(prefix)) return
    const args = msg.content.substring(prefix.length).split(/ +/)
    
    switch(args[0]) {
        case "sw":
            // msg.reply("Star Wars info")

            api.get("/people/?search="+args[1])
            .then((response) => {
                msg.reply(response.data.results[0].name)
            })
            .catch((err) => {
              console.error("ops! ocorreu um erro" + err);
            });

            break
    }
})

client.login(token)
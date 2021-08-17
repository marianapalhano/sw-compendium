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
                
                for (let i = 0; i < response.data.results.length; i++) {
                    let planet = response.data.results[i].homeworld;
                    
                    api.get(planet.substring(22, planet.length)).then((planetRes) => {
                        msg.reply(`
Name: ${response.data.results[i].name}
Height: ${response.data.results[i].height}
Weight: ${response.data.results[i].mass}
Hair color: ${response.data.results[i].hair_color}
Skin color: ${response.data.results[i].skin_color}
Eye color: ${response.data.results[i].eye_color}
Birth year: ${response.data.results[i].birth_year}
Home planet: ${planetRes.data.name}
                        `);
                    });

                }                
            })
            .catch((err) => {
              console.error("ops! ocorreu um erro" + err);
            });

            break
    }
})

client.login(token)
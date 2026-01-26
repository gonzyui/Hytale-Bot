import { Client, GatewayIntentBits, Collection, REST, Routes } from "discord.js";
import { SlashCommand } from "./types";
import path from "path";
import "dotenv/config";
import fs from "fs";

const { DISCORD_TOKEN, CLIENT_ID } = process.env;
if (!DISCORD_TOKEN || !CLIENT_ID) {
    throw new Error("Missing environment variables: DISCORD_TOKEN or CLIENT_ID.");
}

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection<string, SlashCommand>();

const getFiles = (dir: string) => 
    fs.readdirSync(dir).filter(file => file.endsWith(".ts") || file.endsWith(".js"));

async function main() {
    try {
        const commandsPath = path.resolve(__dirname, "commands");
        const commandFiles = getFiles(commandsPath);
        const commandsForDeploy = [];

        for (const file of commandFiles) {
            const filePath = path.join(commandsPath, file);
            try {
                const module = await import(filePath); 
                const command = module.command;

                if (command && 'data' in command && 'execute' in command) {
                    client.commands.set(command.data.name, command);
                    commandsForDeploy.push(command.data.toJSON());
                    console.log(`Command loaded: ${command.data.name}`);
                } else {
                    console.warn(`Warning: ${file} is missing 'data' or 'execute'.`);
                }
            } catch (err) {
                console.error(`Error loading command ${file}:`, err);
            }
        }

        const eventsPath = path.resolve(__dirname, "events");
        const eventFiles = getFiles(eventsPath);

        for (const file of eventFiles) {
            const filePath = path.join(eventsPath, file);
            try {
                const module = await import(filePath);
                const event = module.default;
                if (event && typeof event === 'function') {
                    event(client);
                    console.log(`Event loaded: ${file}`);
                }
            } catch (err) {
                console.error(`Error loading event ${file}:`, err);
            }
        }

        const rest = new REST({ version: '10' }).setToken(DISCORD_TOKEN!);
        console.log('Deploying commands (/) ...');
        
        await rest.put(
            Routes.applicationCommands(CLIENT_ID!),
            { body: commandsForDeploy },
        );
        console.log('Commands registered successfully!');

        await client.login(DISCORD_TOKEN);

    } catch (error) {
        console.error("Critical error during startup:", error);
    }
}

main();
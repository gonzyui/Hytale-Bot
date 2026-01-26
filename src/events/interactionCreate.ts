import { Client, Events, Interaction } from "discord.js";

export default (client: Client) => {
    client.on(Events.InteractionCreate, async (interaction: Interaction) => {
        if (!interaction.isChatInputCommand()) return;

        const command = client.commands.get(interaction.commandName);

        if (!command) {
            console.error(`Command not found: ${interaction.commandName}`);
            return;
        }

        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(`Error executing command ${interaction.commandName}:`, error);
            
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ content: '> An internal error occurred!', flags: ["Ephemeral"] });
            } else {
                await interaction.reply({ content: '> An internal error occurred!', flags: ["Ephemeral"] });
            }
        }
    });
};
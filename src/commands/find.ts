import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
import { getHytaleVisuals } from "../services/wiki";
import { SlashCommand } from "../types";

export const command: SlashCommand = {
    data: new SlashCommandBuilder()
        .setName("find")
        .setDescription("Finds and displays information about a Hytale item")
        .addStringOption(option => 
            option.setName("item")
                .setDescription("The name of the item or mob")
                .setRequired(true)
        ),
    
    execute: async (interaction) => {
        await interaction.deferReply();
        const query = interaction.options.getString("item", true);
        const data = await getHytaleVisuals(query);

        if (!data) {
            await interaction.editReply(`> No results found for "${query}".`);
            return;
        }

        const embed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle(`📖 ${data.title}`)
            .setURL(data.url)
            .setDescription(data.description)
            .setFooter({ text: "Data provided by Hytale Wiki" });

        if (data.imageUrl) embed.setImage(data.imageUrl);

        await interaction.editReply({ embeds: [embed] });
    }
};
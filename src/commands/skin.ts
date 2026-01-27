import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
import { SlashCommand, RenderType } from "../types";
import { getHyvatarUrl } from "../services/hyvatar";

export const command: SlashCommand = {
    data: new SlashCommandBuilder()
        .setName("skin")
        .setDescription("Display a player's Hytale skin or cape")
        .addStringOption(option => 
            option.setName("username")
                .setDescription("The player's username")
                .setRequired(true)
        )
        .addStringOption(option => 
            option.setName("type")
                .setDescription("Render type")
                .addChoices(
                    { name: 'Full Body', value: 'full' },
                    { name: 'Head Only', value: 'head' },
                    { name: 'Cape', value: 'cape' }
                )
        )
        .addIntegerOption(option => 
            option.setName("size")
                .setDescription("Image size (px)")
                .addChoices(
                    { name: '256px', value: 256 },
                    { name: '512px', value: 512 }
                )
        )
        .addIntegerOption(option => 
            option.setName("rotation")
                .setDescription("Viewing angle")
                .addChoices(
                    { name: 'Front (0°)', value: 0 },
                    { name: 'Left (45°)', value: 45 },
                    { name: 'Side (90°)', value: 90 },
                    { name: 'Right (-45°)', value: 315 },
                    { name: 'Back (180°)', value: 180 }
                )
        ),
    
    execute: async (interaction) => {
        const username = interaction.options.getString("username", true);
        const type = (interaction.options.getString("type") || 'full') as RenderType;
        const size = interaction.options.getInteger("size") || 512;
        const rotation = interaction.options.getInteger("rotation") || 0;

        const skinUrl = getHyvatarUrl({ username, type, size, rotation });

        let renderLabel = 'Body';
        if (type === 'head') renderLabel = 'Head';
        if (type === 'cape') renderLabel = 'Cape';

        const embed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle(`${username}'s ${renderLabel}`)
            .setDescription(`**Render:** ${renderLabel} | **Angle:** ${rotation}°`)
            .setImage(skinUrl)
            .setURL(skinUrl)
            .setFooter({ text: "Powered by Hyvatar.io" })
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    }
};
import { SlashCommandBuilder, CommandInteraction, Collection, ChatInputCommandInteraction } from "discord.js";

export interface SlashCommand {
    data: SlashCommandBuilder | any;
    execute: (interaction: ChatInputCommandInteraction) => Promise<void>;
}

export interface WikiResult {
    title: string;
    description: string;
    imageUrl: string | null;
    url: string;
}

declare module "discord.js" {
    export interface Client {
        commands: Collection<string, SlashCommand>;
    }
}
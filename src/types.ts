import { 
    SlashCommandBuilder, 
    Collection, 
    ChatInputCommandInteraction, 
    SlashCommandOptionsOnlyBuilder, 
    SlashCommandSubcommandsOnlyBuilder 
} from "discord.js";

export interface SlashCommand {
    data: SlashCommandBuilder | SlashCommandOptionsOnlyBuilder | SlashCommandSubcommandsOnlyBuilder;
    
    execute: (interaction: ChatInputCommandInteraction) => Promise<void>;
}

export interface WikiResult {
    title: string;
    description: string;
    imageUrl: string | null;
    url: string;
}

export type RenderType = 'full' | 'head' | 'cape';

export interface SkinOptions {
    username: string;
    type: RenderType;
    size: number;
    rotation: number;
}

declare module "discord.js" {
    export interface Client {
        commands: Collection<string, SlashCommand>;
    }
}
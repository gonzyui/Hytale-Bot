import { Client, Events, ActivityType } from "discord.js";

export default (client: Client) => {
    client.once(Events.ClientReady, c => {
        console.log(`Bot is online: ${c.user.tag}`);
        client.user?.setActivity('the Wiki', { type: ActivityType.Watching });
    });
};
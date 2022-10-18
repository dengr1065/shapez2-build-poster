import axios from "axios";
import { ButtonStyle, ComponentType, APIEmbed } from "discord-api-types/v10";
import { BuildEvent } from "./build_event.js";
import { discordWebhook } from "./config.js";

const buttonRow = {
    type: ComponentType.ActionRow,
    components: [
        {
            type: ComponentType.Button,
            style: ButtonStyle.Link,
            label: "Download",
            url: null as string | null
        }
    ]
};

async function postWebhook(embed: APIEmbed, url: string) {
    buttonRow.components[0].url = url;
    const body = { embeds: [embed], components: [buttonRow] };

    return await axios.post(discordWebhook, body, {
        params: { wait: true }
    });
}

export function handleEvent(event: BuildEvent) {
    if (event.buildStatus !== "success") {
        // For now, we ignore everything else
        return;
    }

    const downloadURL = event.links.share_url?.href;
    if (!downloadURL) {
        console.warn("Got success event but no share_url!", JSON.stringify(event));
        return;
    }

    const info = {
        title: "New build available!",
        timestamp: new Date().toISOString(),
        color: 0x32e040,
        fields: [{ name: "Platform", value: event.platform }]
    };

    return postWebhook(info, downloadURL);
}

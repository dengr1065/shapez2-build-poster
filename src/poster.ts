import axios from "axios";
import { APIEmbed } from "discord-api-types/v10";
import { BuildEvent } from "./build_event.js";
import { discordWebhook } from "./config.js";

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

    const info: APIEmbed = {
        title: `New build (#${event.buildNumber})`,
        description: `[Download this build](${downloadURL})`,
        timestamp: new Date().toISOString(),
        color: 0x32e040,
        url: downloadURL,
        fields: [{ name: "Platform", value: event.platformName }]
    };

    const body = { embeds: [info] };
    return axios.post(discordWebhook, body, {
        params: { wait: true }
    });
}

import axios from "axios";

/**
 * @param {import("./build_event").BuildEvent} event
 */
export async function handleEvent(event) {
    const shareURL = event.shareURL;
    if (shareURL == null) {
        console.warn("Not sending linkless message");
        return;
    }

    const info = {
        title: "New build available!",
        timestamp: Date.now(),
        color: 0x32e040,
        fields: [{ name: "Platform", value: event.platform }]
    };

    const body = {
        embeds: [info],
        components: [
            {
                type: 1,
                components: [
                    {
                        type: 2,
                        label: "Download",
                        style: 5,
                        url: shareURL
                    }
                ]
            }
        ]
    };

    await axios.post(process.env.DISCORD_WEBHOOK, body, {
        params: {
            wait: true
        }
    });
}

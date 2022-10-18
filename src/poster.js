import axios from "axios";

async function postWebhook(embed, downloadURL) {
    const body = {
        embeds: [embed],
        components: [
            {
                type: 1,
                components: [
                    {
                        type: 2,
                        label: "Download",
                        style: 5,
                        url: downloadURL
                    }
                ]
            }
        ]
    };

    return await axios.post(process.env.DISCORD_WEBHOOK, body, {
        params: {
            wait: true
        }
    });
}

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

    try {
        return await postWebhook(info, shareURL);
    } catch (err) {
        if (err.response) {
            // Got a failure response
            throw new Error("Webhook post failed:", err.response.body.toString());
        } else {
            throw err;
        }
    }
}

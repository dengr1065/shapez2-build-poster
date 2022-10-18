import { config } from "dotenv";
import express from "express";
import { BuildEvent } from "./build_event.js";
import { handleEvent } from "./poster.js";
import { verifyRequest } from "./verifier.js";

const configVars = ["application_secret", "discord_webhook", "port"];
config();

for (const envVar of configVars) {
    if (!(envVar.toUpperCase() in process.env)) {
        console.warn(`${envVar} is not defined!`);
        process.exitCode = 1;
    }
}

const app = express();
const jsonMiddleware = express.json({ strict: true, verify: verifyRequest });

app.post("/*", jsonMiddleware, async (req, res) => {
    if (!req.verified) {
        return res.sendStatus(401);
    }

    const eventId = req.header("X-UnityCloudBuild-Event");

    try {
        const event = new BuildEvent(eventId, req.body);
        await handleEvent(event);
    } catch (err) {
        console.error("Failed to handle event:", err);
        return res.sendStatus(400);
    }

    res.sendStatus(204);
});

async function main() {
    await new Promise((resolve) => {
        app.listen(process.env.PORT, "0.0.0.0", resolve);
    });

    console.log(`Listening for POST requests on port ${process.env.PORT}`);
}

if (!process.exitCode) {
    main();
}

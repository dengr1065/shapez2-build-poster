import express from "express";
import { port } from "./config.js";
import { handleEvent } from "./poster.js";
import { verifyRequest } from "./verifier.js";

const app = express();
const jsonMiddleware = express.json({ strict: true, verify: verifyRequest });

app.post("/*", jsonMiddleware, async (req, res) => {
    if (!req.verified) {
        console.warn("Got invalid signature for message!");
        return res.sendStatus(401);
    }

    try {
        await handleEvent(req.body);
    } catch {
        return res.sendStatus(500);
    }

    res.sendStatus(204);
});

app.listen(port, "0.0.0.0");

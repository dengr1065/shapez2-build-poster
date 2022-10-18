import { createHmac } from "crypto";

export function verifyRequest(req, _, buffer) {
    const signature = req.header("X-UnityCloudBuild-Signature");
    const expected = createHmac("sha256", process.env.APPLICATION_SECRET)
        .update(buffer)
        .digest("hex");

    if (signature === expected) {
        req.verified = true;
    } else {
        console.error(`Signature mismatch! Got ${signature}, expected ${expected}`);
    }
}

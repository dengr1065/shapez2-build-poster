import { createHmac } from "crypto";
import { applicationSecret } from "./config.js";
export function verifyRequest(req, _res, buffer) {
    const signature = req.header("X-UnityCloudBuild-Signature");
    const expected = createHmac("sha256", applicationSecret).update(buffer).digest("hex");
    req.verified = signature === expected;
}

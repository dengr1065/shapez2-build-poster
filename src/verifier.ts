import { createHmac } from "crypto";
import { Request, Response } from "express";
import { applicationSecret } from "./config.js";

export function verifyRequest(req: Request, _res: Response, buffer: Buffer) {
    const signature = req.header("X-UnityCloudBuild-Signature");
    const expected = createHmac("sha256", applicationSecret).update(buffer).digest("hex");

    req.verified = signature === expected;
}

function ensureEnvironment(variables) {
    const missing = variables.find((v) => !(v in process.env));
    if (missing) {
        throw new Error(`${missing} is not defined!`);
    }
}
ensureEnvironment(["APPLICATION_SECRET", "DISCORD_WEBHOOK", "PORT"]);
const applicationSecret = process.env.APPLICATION_SECRET;
const discordWebhook = process.env.DISCORD_WEBHOOK;
const port = Number(process.env.PORT);
export { applicationSecret, discordWebhook, port };

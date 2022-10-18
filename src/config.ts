function ensureEnvironment(variables: string[]) {
    const missing = variables.find((v) => !(v in process.env));
    if (missing) {
        throw new Error(`${missing} is not defined!`);
    }
}

ensureEnvironment(["APPLICATION_SECRET", "DISCORD_WEBHOOK", "PORT"]);
const applicationSecret = process.env.APPLICATION_SECRET as string;
const discordWebhook = process.env.DISCORD_WEBHOOK as string;
const port = Number(process.env.PORT as string);

export { applicationSecret, discordWebhook, port };

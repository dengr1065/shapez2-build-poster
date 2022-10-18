# shapez2-build-poster

A small proxy between Unity Cloud Build and Discord to send formatted webhooks for
successful builds of shapez 2. **WIP**: Features are not finalized, unknown bugs may
appear.

## Configuration

Copy `.env.example` to `.env`. Then, set the application secret, Discord webhook URL and a
port to listen on. Use a reverse proxy to handle HTTPs connections and make sure
`X-UnityCloudBuild-Signature` and `X-UnityCloudBuild-Event` headers are proxied.

The application secret can be set to any string, but it must match with the one specified
in Unity Cloud Build dashboard.

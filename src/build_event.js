export class BuildEvent {
    constructor(eventId, data) {
        this.eventId = eventId;
        this.data = data;

        if (process.env.NODE_ENV == "debug") {
            console.log("Event constructed: ", this);
        }
    }

    get platform() {
        return this.data.buildTargetName;
    }

    get shareURL() {
        const allLinks = this.data.links;
        const shareLinkKey = Object.keys(allLinks).find((k) => k.includes("share"));
        if (!shareLinkKey) {
            console.warn("No share link found, available links:", allLinks);
            return null;
        }

        return allLinks[shareLinkKey].href;
    }
}

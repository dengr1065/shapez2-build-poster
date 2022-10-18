export type BuildStatus = "success" | string;

export interface BuildEvent {
    buildNumber: number;
    buildStatus: BuildStatus;
    buildTargetName: string;
    lastBuiltRevision: string | void;
    platform: string;
    platformName: string;
    links: {
        share_url: {
            href: string;
        };
    };
}

import { ReactNode } from "react";

export class LinkData {
    path?: string;
    title?: string;
    newTab?: boolean;
    isExternal?: boolean;
    associatedIcon?: ReactNode;

    constructor(data?) {
        Object.assign(this, data);
    }
}

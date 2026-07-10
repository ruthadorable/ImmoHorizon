export class Image {

    id?: number;

    primary: boolean;

    imageKey: string; // S3 key (recommended)

    url: string; // optional (can be generated instead)

    constructor(isPrimary: boolean, imageKey: string, url: string) {
        this.primary = isPrimary;
        this.imageKey = imageKey;
        this.url = url;
    }
}

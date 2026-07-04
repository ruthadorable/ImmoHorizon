export class Image {

    id?: number;

    isPrimary: boolean;

    imageKey: string; // S3 key (recommended)

    url: string; // optional (can be generated instead)

    constructor(isPrimary: boolean, imageKey: string, url: string) {
        this.isPrimary = isPrimary;
        this.imageKey = imageKey;
        this.url = url;
    }
}

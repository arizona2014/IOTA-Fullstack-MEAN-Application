export class Video {

    content: string;
    link: string;
    videoId?: string;
    userId?: string;

    constructor(content: string, link: string, videoId?:string, userId?: string){

        this.content = content;
        this.link = link;
        this.videoId = videoId;
        this.userId = userId;

    }

}

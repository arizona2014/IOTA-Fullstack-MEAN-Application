import { Video } from '../../../../../../../../Users/Arizona/Desktop/iota/assets/app/videos/video.model';
import { Http, Response, Headers } from "@angular/http";
import { Injectable, EventEmitter } from "@angular/core";
import 'rxjs/Rx';
import { Observable } from "rxjs";

@Injectable()
export class VideoService {

    private videos : Video[] = [];
    videoIsEdit = new EventEmitter<Video>();

    constructor(private http: Http){ }

    addVideo(video: Video){
        const body = JSON.stringify(video);
        const headers = new Headers({'Content-Type': 'application/json'});
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        return this.http.post('http://localhost:3000/video' + token, body, {headers: headers})
            .map((response: Response) => {
                const result = response.json();
                const video = new Video(result.obj.content, result.link, result.obj._id, result.obj.user );
                this.videos.push(video);
                return video;
            })
            .catch((error: Response) => Observable.throw(error.json()));
    }

    getVideos(){
        return this.http.get('http://localhost:3000/video')
            .map((response: Response) => {
                const videos = response.json().obj;
                let transformedVideos: Video[] = [];
                for (let video of videos){
                    transformedVideos.push(new Video(video.content, video.user.firstName, video._id,  video.user._id));
                }
                this.videos = transformedVideos;
                return transformedVideos;
            })
            .catch((error: Response) => Observable.throw(error.json()));
    }

    deleteVideo(video: Video){
        this.videos.splice(this.videos.indexOf(video),1);
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        return this.http.delete('http://localhost:3000/video/' + video.videoId + token)
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()));
    }

    editVideo(video: Video){
        this.videoIsEdit.emit(video);
    }

    updateVideo(video: Video){
        const body = JSON.stringify(video);
        const headers = new Headers({'Content-Type': 'application/json'});
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        return this.http.patch('http://localhost:3000/video/' + video.videoId + token, body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()));
    }

}


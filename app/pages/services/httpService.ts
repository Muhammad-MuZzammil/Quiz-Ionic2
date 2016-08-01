import {Injectable} from "@angular/core";
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import { Observable} from "rxjs/Observable";
import "rxjs/Rx";
@Injectable()

export class HttpService {
    constructor(private _http: Http) { }
    httpPost(url, form) {
        let headers: Headers = new Headers();
        headers.append('Content-Type', 'text/plain');
        let options: RequestOptions = new RequestOptions();
        options.headers = headers;
        return this._http.post(url, form, options)
            .map(res => res.json());
    }
}
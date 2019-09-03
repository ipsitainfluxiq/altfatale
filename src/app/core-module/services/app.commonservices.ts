/**
 * Created by kta pc on 7/25/2017.
 */
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
// import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';

@Injectable()
export class Commonservices {
    url: any;
    client_id: any;
    client_secret: any;

    constructor(private http: HttpClient) {
        if (window.location.hostname == 'localhost') {
            this.url = 'http://localhost:3006/';
        } else {
            this.url = 'http://influxiq.com:3017/';
        }

    }



}
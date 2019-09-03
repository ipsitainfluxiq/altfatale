import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

/* set common header */
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})

export class HttpServiceService {

  private environment: any = "dev";
  private siteSettingData: any;

  constructor(private http: HttpClient) {
    this.getSiteSettingData().subscribe(responce => {
      this.siteSettingData = responce;
    });
  }

  /* read site setting data */
  public getSiteSettingData(): Observable<any> {
    return this.http.get("./assets/system/site_setting.json");
  }

  /* call api via post methord */
  httpViaPost(url, jsonData): Observable<any> {
    return this.http.post(this.siteSettingData.apiUrl + url, jsonData);
  }

  /* call api via get methord */
  httpViaGet(url, jsonData): Observable<any> {
    return this.http.get(this.siteSettingData.apiUrl + url, jsonData);
  }
}

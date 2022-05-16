import { Injectable } from '@angular/core';
import { HttpClient,HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment.prod';
@Injectable({
    providedIn: 'root',
})
export class ApplicationFormService {
    url = environment.ApiUrl;
    constructor(public http: HttpClient, public router: Router) {}
    postApplicationForm(data:any):Observable<HttpEvent<any>>{
        const req = new HttpRequest("POST", this.url+"/ApplicationForm/", data, {
            reportProgress: true,
            responseType: "json",
        });
        return this.http.request(req);
    }
    editApplicationForm(id:string,data:any):Observable<HttpEvent<any>>{
        const req = new HttpRequest("PATCH", this.url+"/ApplicationForm/"+id, data, {
            reportProgress: true,
            responseType: "json",
        });
        return this.http.request(req);
    }
    getApplicationForm(id: any): Observable<any> {
        return this.http.get(this.url+"/ApplicationForm/" + id);
    }

    async getApplicationFormByEmail( email: string) {
        return await this.http
            .get<any>(this.url + "/ApplicationForm/email/" + email)
            .toPromise();
    }
    DownloadDataFile(id:any,title:string){
        var win= window.open(this.url+'/files/download/'+id+"/"+title)
    }
    deleteDataFile(id:string):Observable<any>{
        return this.http.delete(this.url+'/files/'+id)
    }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment.prod';
import { Categories } from '../Classes/Category';
import { filters } from '../Classes/util';
@Injectable({
    providedIn: 'root',
})
export class AdminService {
    url = environment.ApiUrl;
    TargetCategories = new  Categories();
    SourceCategories=filters;
    constructor(public http: HttpClient, public router: Router) {}

    getApplications(): Observable<any> {
        return this.http.get(this.url + "/ApplicationForm/");
    }
    updateApplication(id:string,data:any): Observable<any>{
        return this.http.patch(this.url+'/ApplicationForm//interview/'+id,data)
    }

    deleteApplicationForm(id:string):Observable<any>{
        return this.http.delete(this.url+'/ApplicationForm/'+id)
    }
    postJob(data:any):Observable<any>{
        return this.http.post(this.url + "/jobs/",data);
    }
    editJob(id:string,data:any):Observable<any>{
        return this.http.patch(this.url + "/jobs/"+id,data);
    }
    getJob(id:string):Observable<any>{
        return this.http.get(this.url + "/jobs/"+id);
    }
    getJobs():Observable<any>{
        return this.http.get(this.url + "/jobs/");
    }
    deleteJob(id:string):Observable<any>{
        return this.http.delete(this.url+'/jobs/'+id)
    }

    getFilteredApplications(data:any):Observable<any>{
        return this.http.post(this.url + "/ApplicationForm/filter",data);
    }
}

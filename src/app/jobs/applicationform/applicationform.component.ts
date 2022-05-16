import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {Application} from '../../Classes/Application'
import {LocalDate } from 'src/app/Classes/util';
import { HttpEventType, HttpResponse } from "@angular/common/http";
import { ActivatedRoute } from "@angular/router";
import {AuthenticationService,UserDetails } from "../../services/authentication.service";
import{ApplicationFormService}  from "../../services/application-form.service";
import{RoutingService}  from "../../services/routing.service";
import { AdminService } from 'src/app/services/admin.service';
@Component({
    selector: 'app-applicationform',
    templateUrl: './applicationform.component.html',
    styleUrls: ['./applicationform.component.scss'],
})
export class ApplicationformComponent implements OnInit {
    info:Application=new Application();
    currentDate:string=new LocalDate().date;
    MaritialStatuses:String[]=["أعزب","متزوج","أرمل","مطلق"];
    degrees:String[]=["بكالوريوس","دبلوم عالي","ماجستير","دكتوراه"];
    minorities:string[]=["مسيحي","شبكي"]
    yes:string="نعم";
    no:string="كلا";
    currentUser:UserDetails;
    jobs:any[]=[];
    Files:any[]=[];
    selectedJob:any=null;

    isLoading:Boolean=false;
    isSubmitted:Boolean=false;
    progress=0;
    constructor(
        public auth: AuthenticationService,
        public applicationService:ApplicationFormService,
        public adminService:AdminService,
        public router:RoutingService) {}

    ngOnInit(): void {
        this.info.Files.addFile();
        if(this.auth.isAdmin()){
            this.router.navigateTo('/admin/')
        }else{
            if (this.auth.isLoggedIn() == true){
                this.currentUser=this.auth.getUserDetails();
                this.getAppliactionForm();
            }
        }
    }
    getJobs(){
        this.adminService.getJobs().subscribe(response=>{
            this.jobs=response;
            this.selectedJob=this.jobs[0]
            this.info.job.owner=this.selectedJob._id;
            this.info.job.title=this.selectedJob.title+"-" +this.selectedJob.profession;
        })
    }
    onJobChange(event){
        this.selectedJob=this.jobs[event.target.value]
        this.info.job.owner=this.selectedJob._id;
        this.info.job.title=this.selectedJob.title+"-" +this.selectedJob.profession;
    }
   async getAppliactionForm(){
        var response= await this.applicationService.getApplicationFormByEmail(this.currentUser.email);
        if(response!=null){
            this.router.navigateTo('/myform/'+response._id)
        }else{
            this.getJobs();
        }
        
    }

    submit(frm: NgForm){
        if (frm.invalid){
            window.scrollTo(0, 100);
            return;
        } 
        var data=this.info.toFormData();
        data.append("email",this.currentUser.email);
        data.append("mobile",this.currentUser.mobile)
        this.isLoading=true;
        this.isSubmitted=true;
        this.applicationService.postApplicationForm(data).subscribe(response=>{
            if (response.type == HttpEventType.UploadProgress) {
                this.progress = Math.round(
                    (100 *response.loaded) / response.total
                );
            } else if (response instanceof HttpResponse) {
                this.router.navigateTo("/myform/"+response.body._id);
                this.isLoading= false;
                this.progress = 0;
            }
        },error=>{
            this.isSubmitted=false;
            this.isLoading=false;
            console.log(error)
        })
      
    }

    onFileSelected(i:number,event){
        if (event.target.files.length > 0) {
            this.info.Files.Filelist[i] = <File>event.target.files[0];
        }
    }

        
    print(){
        window.print()
    }

    deleteFile(id:string){

    }
}

@Component({
    selector: 'app-editapplicationform',
    templateUrl: './applicationform.component.html',
    styleUrls: ['./applicationform.component.scss'],
})
export class EditApplicationformComponent implements OnInit {

    info:Application=new Application();
    currentDate:string=new LocalDate().date;
    MaritialStatuses:string[]=["أعزب","متزوج","أرمل","مطلق"];
    degrees:String[]=["بكالوريوس","دبلوم عالي","ماجستير","دكتوراه"];
    minorities:string[]=["مسيحي","شبكي"]
    yes:string="نعم";
    no:string="كلا";
    currentUser:UserDetails;
    jobs:any[]=[];
    selectedJob:any=null;
    Files:any[]=[];

    isLoading:Boolean=false;
    isSubmitted:Boolean=false;
    Form_id:string=null;
    progress=0;
    constructor(
        public auth: AuthenticationService,
        public applicationService:ApplicationFormService,
        public Activerouter: ActivatedRoute,
        public adminService:AdminService,
        public router:RoutingService) {}

    async ngOnInit() {
        this.info.Files.addFile();
        if (this.auth.isLoggedIn() == true){
            this.currentUser=this.auth.getUserDetails();
        }
        this.Form_id = await this.Activerouter.snapshot.params['id'];
        this.getApplicationForm();
    }

    getApplicationForm(){
        this.applicationService.getApplicationForm(this.Form_id).subscribe(
            response=>{
                this.info.fromJson(response.applicationForm);
                this.Files=response.Files;
                this.info.Files.addFile();
                this.getJobs();
            }
        ),error=>{
            console.log(error)
        }
    }
    getJobs(){
        this.adminService.getJobs().subscribe(response=>{
            this.jobs=response;
        })
    }

    onJobChange(event:any){
        this.selectedJob=this.jobs[event.target.value]
        this.info.job.owner=this.selectedJob._id;
        this.info.job.title=this.selectedJob.title+"-" +this.selectedJob.profession;
        
    }

    submit(frm:NgForm){
        if (frm.invalid){
            window.scrollTo(0, 100);
            return;
        } 

        var data=this.info.toFormData();
        data.append("email",this.currentUser.email);
        data.append("mobile",this.currentUser.mobile)
        this.isLoading=true;
        this.isSubmitted=true;
        this.applicationService.editApplicationForm(this.Form_id,data).subscribe(response=>{
            if (response.type == HttpEventType.UploadProgress) {
                this.progress = Math.round(
                    (100 *response.loaded) / response.total
                );
            } else if (response instanceof HttpResponse) {
                
                this.router.navigateTo("/myform/"+response.body._id);
                this.isLoading= false;
                this.progress = 0;
            }
        },error=>{
            this.isSubmitted=false;
            this.isLoading=false;
        })
      

    }

    onFileSelected(i:number,event){
        if (event.target.files.length > 0) {
            this.info.Files.Filelist[i] = <File>event.target.files[0];
        }
    }

    print(){
        window.print()
    }

    deleteFile(id:string){
        this.applicationService.deleteDataFile(id).subscribe(response=>{
            this.Files=response;
        })
    }


}


import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import{ApplicationFormService}  from "../../services/application-form.service";
import{RoutingService}  from "../../services/routing.service";


@Component({
    selector: 'app-my-form',
    templateUrl: './my-form.component.html',
    styleUrls: ['./my-form.component.scss'],
})
export class MyFormComponent implements OnInit {
    Files:any[]=[];
    constructor(
        public Activerouter: ActivatedRoute,
        public router:RoutingService,
        public applicationService:ApplicationFormService) {}
    Form_id: any = null;
    info:any=null;

    MaritialStatuses:String[]=["أعزب","متزوج","أرمل","مطلق"];
    degrees:String[]=["بكالوريوس","دبلوم عالي","ماجستير","دكتوراه"];
    minorities:string[]=["مسيحي","شبكي"]
    yes:string="نعم";
    no:string="كلا";
    async ngOnInit() {
        this.Form_id = await this.Activerouter.snapshot.params['id'];
        this.getApplicationForm();
    }
    getApplicationForm(){
        this.applicationService.getApplicationForm(this.Form_id).subscribe(
            response=>{
                this.info=response.applicationForm;
                this.Files=response.Files;
            }
        ),error=>{
            console.log(error)
        }
    }

    print(){
            document.title=this.info.Name;
            window.print()
           
     
    }
}

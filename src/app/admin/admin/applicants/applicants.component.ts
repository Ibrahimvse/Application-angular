import { Component, OnInit } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { ModalService } from 'src/app/services/modal.service';
import { RoutingService } from 'src/app/services/routing.service';
import { dtOptions, monthlyButtonsOptions } from '../../../Classes/datatable';
import { EventEmitter, Output, Input } from "@angular/core";

import { AdminService } from '../../../services/admin.service';
import { NgForm } from '@angular/forms';
import { Category,Categories } from 'src/app/Classes/Category';
@Component({
    selector: 'app-applicants',
    templateUrl: './applicants.component.html',
    styleUrls: ['./applicants.component.scss'],
})
export class ApplicantsComponent implements OnInit {
    dtOptions: any = {};
    public records: any[] = [];
    isLoading: Boolean = false;
    SelectedItem = null;
    Categories = new Categories();
    jobs:any[]=[];
    constructor(
        public adminService: AdminService,
        public router: RoutingService,
        public modal: ModalService
    ) {}

    ngOnInit(): void {
        this.dtOptions = {
            language: dtOptions.language,
            dom: 'Bfrtip',
            buttons: monthlyButtonsOptions.buttons,
        };
        this.getApplications();
        this.getJobs();
    }

    delete(id: number) {
        this.adminService.deleteApplicationForm(this.SelectedItem._id).subscribe(response=>{
            this.modal.hide();
            var index =this.records.findIndex(item=>item._id==this.SelectedItem._id)
            this.records.splice(index,1);
        },(error)=>{
            this.modal.hide();
        })
    }

    update(frm:NgForm){
        if(frm.invalid)return;
        
        this.adminService.updateApplication(this.SelectedItem._id, this.SelectedItem).subscribe(
            (response)=>{
                var index =this.records.findIndex(item=>item._id==this.SelectedItem._id)
                this.records[index]=response;
                this.modal.hide();
            }
        )
    }
    getJobs(){
        this.adminService.getJobs().subscribe(response=>{
            this.jobs=response;
            this.adminService.SourceCategories[0].values=[];
            this.jobs.forEach(item=>{
                this.adminService.SourceCategories[0].values.push(item.title+"-"+item.profession);
            })
            
        })
    }

    getApplications() {
        this.records=[];
        this.isLoading=true;
        this.adminService.getFilteredApplications(this.adminService.TargetCategories.CategoriesList).subscribe(response=>{
            this.records=response;
            this.isLoading=false
        })
    }

    setBuutons() {
        var ButtonsOptions = {
            buttons: [
                {
                    extend: 'print',
                    text: '<i class="fa fa-print fa-lg px-2"></i> طباعة ',
                    orientation: 'landscape',
                    className: 'btn btn-primary',
                },
                {
                    extend: 'excel',
                    text: '<i class="fa fa-file-excel fa-lg px-2"></i> تصدير اكسل',
                    className: 'btn btn-primary',
                },
            ],
        };
        return ButtonsOptions;
    }

    updateContent(event:any){
        this.getApplications();
    }
}



@Component({
    selector: "app-categories",
    templateUrl: "./CategoriesFilters.html",
})
export class CategoriesFilters implements OnInit {
    @Input() SourceCategories: any;
    @Input() TargetCategories: Categories;
    @Input() filters: string;
    @Output() contentUpdate = new EventEmitter();
    id = Math.round(Math.random() * 10000);
    constructor() {}
    ngOnInit() {}
    onChange(form: NgForm) {}
    onCheckboxChange(i, event) {
        if (event.target.checked)
            this.TargetCategories.push(event.target.name, event.target.value);
        else this.TargetCategories.pop(event.target.name, event.target.value);
        this.contentUpdate.emit(true);
    }
}

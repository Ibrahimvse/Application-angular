import { Component, OnInit } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { ModalService } from 'src/app/services/modal.service';
import { RoutingService } from 'src/app/services/routing.service';
import {
    dtOptions,
    monthlyButtonsOptions,
} from '../../../../Classes/datatable';
import { AdminService } from '../../../../services/admin.service';


@Component({
    selector: 'app-jobs-list',
    templateUrl: './jobs-list.component.html',
    styleUrls: ['./jobs-list.component.scss'],
})
export class JobsListComponent implements OnInit {
    dtOptions: any = {};
    public records: any[] = [];
    isLoading: Boolean = false;
    SelectedItem = null;
    constructor(
        public adminService: AdminService,
        public router: RoutingService,
        public modal: ModalService
    ) {}

    ngOnInit(): void {
        this.dtOptions = {
            language: dtOptions.language,
        };
        this.getJobs();
    }
    getJobs(){
        this.adminService.getJobs().subscribe(response=>{
            this.records=response;
        })
    }

    delete(id: string) {
        this.records=[]
        this.adminService.deleteJob(id).subscribe(response=>{
            this.modal.hide();
            this.records=response;
        },error=>{
            this.modal.hide();
        })
    }
}

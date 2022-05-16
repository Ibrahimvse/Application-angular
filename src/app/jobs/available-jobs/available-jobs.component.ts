import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { DataTableDirective } from 'angular-datatables';
import {
  dtOptions,
  monthlyButtonsOptions,
} from '../../Classes/datatable';
@Component({
  selector: 'app-available-jobs',
  templateUrl: './available-jobs.component.html',
  styleUrls: ['./available-jobs.component.scss']
})
export class AvailableJobsComponent implements OnInit {
  records:any[]=[]
  isLoading:Boolean=false
  dtOptions: any = {};
  constructor(public adminService:AdminService) { }

  ngOnInit(): void {
    this.dtOptions = {
      language: dtOptions.language,
  };

    this.getJobs();
  }

  getJobs(){
    this.isLoading=true;
    this.adminService.getJobs().subscribe(response=>{
        this.records=response;
        this.isLoading=false;
    })
}

}

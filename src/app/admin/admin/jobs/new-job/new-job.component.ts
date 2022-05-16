import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { RoutingService } from 'src/app/services/routing.service';

class job {
    title: string = '';
    degree: string = '';
    JobsNumber: Number = 1;
    notes: string = '';
    profession: string = '';
    availability: string = 'مفتوح';
}

@Component({
    selector: 'app-new-job',
    templateUrl: './new-job.component.html',
    styleUrls: ['./new-job.component.scss'],
})
export class NewJobComponent implements OnInit {
    info: job = new job();
    degrees: string[] = ['بكالوريوس', 'دبلوم عالي', 'ماجستير', 'دكتوراه'];
    constructor(
        public adminService: AdminService,
        public router: RoutingService
    ) {}

    ngOnInit(): void {}
    submit(frm: NgForm) {
        if (frm.invalid) {
            return;
        }
        this.adminService.postJob(this.info).subscribe((response) => {
            this.router.navigateTo('/admin/jobs/jobslist');
        });
    }
}

@Component({
    selector: 'app-edit-job',
    templateUrl: './new-job.component.html',
    styleUrls: ['./new-job.component.scss'],
})
export class EditJobComponent implements OnInit {
    info: job = new job();
    degrees: string[] = ['بكالوريوس', 'دبلوم عالي', 'ماجستير', 'دكتوراه'];
    Job_id: string = null;
    constructor(
        public adminService: AdminService,
        public router: RoutingService,
        public Activerouter: ActivatedRoute
    ) {}

    async ngOnInit() {
        this.Job_id = await this.Activerouter.snapshot.params['id'];
        this.getJob();
    }
    getJob() {
        this.adminService.getJob(this.Job_id).subscribe((response) => {
            this.info = response;
        });
    }
    submit(frm: NgForm) {
        if (frm.invalid) {
            return;
        }
        this.adminService
            .editJob(this.Job_id, this.info)
            .subscribe((response) => {
                this.router.navigateTo('/admin/jobs/jobslist');
            });
    }
}

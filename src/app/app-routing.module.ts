import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ApplicationformComponent,EditApplicationformComponent } from './jobs/applicationform/applicationform.component';
import { MyFormComponent } from './jobs/my-form/my-form.component';
import { LoginComponent } from './home/account/login/login.component';
import { RegisterComponent } from './home/account/register/register.component';
import { AdminGuardService, AuthGuardService } from './services/auth-guard.service';

import { AdminComponent } from './admin/admin/admin.component';
import {ApplicantsComponent} from './admin/admin/applicants/applicants.component'
import {JobsComponent} from './admin/admin/jobs/jobs.component'
import { JobsListComponent } from './admin/admin/jobs/jobs-list/jobs-list.component'
import { NewJobComponent, EditJobComponent } from './admin/admin/jobs/new-job/new-job.component'
import { AvailableJobsComponent } from './jobs/available-jobs/available-jobs.component'
import { InstructionsConditionsComponent } from './jobs/instructions-conditions/instructions-conditions.component';


const routes: Routes = [
    { path: "", redirectTo: "/ApplicationForm", pathMatch: "full" },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    {
        path: 'ApplicationForm',
        component: ApplicationformComponent,
        canActivate:[AuthGuardService]
    },
    {
        path: 'EditApplicationForm/:id',
        component: EditApplicationformComponent,
        canActivate:[AuthGuardService]
    },
    {
        path: 'myform/:id',
        component: MyFormComponent,
        canActivate:[AuthGuardService]
    },
    {
        path: 'availablejobs',
        component: AvailableJobsComponent,
    },
    {
        path:"instructions",
        component:InstructionsConditionsComponent
    },

    {
        path:'admin',
        component:AdminComponent,
        canActivate:[AdminGuardService],
        children:[
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'applicants',
            },
            {
                path: 'applicants',
                component: ApplicantsComponent,
            },
            {
                path:'jobs',
                component:JobsComponent,
                children:[
                    {
                        path: '',
                        pathMatch: 'full',
                        redirectTo: 'jobslist',
                    },
                    {
                        path: 'jobslist',
                        component: JobsListComponent,
                    },
                    {
                        path: 'newjob',
                        component: NewJobComponent,
                    },
                    {
                        path: 'editjob/:id',
                        component: EditJobComponent,
                    },
                ]
            }
        ]
    }


];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}

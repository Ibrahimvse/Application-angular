import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ModalModule, BsModalRef } from "ngx-bootstrap/modal";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AuthenticationService } from "./services/authentication.service";
import { AppInterceptorService } from "./services/app-interceptor.service";
import { DataTablesModule } from "angular-datatables";


import { AppComponent } from './app.component';
import { TopheaderComponent } from './home/headers/topheader/topheader.component';
import { FooterComponent } from './home/headers/footer/footer.component';
import { HomeComponent } from './home/home/home.component';
import { ApplicationformComponent ,EditApplicationformComponent} from './jobs/applicationform/applicationform.component';
import { AdminComponent } from './admin/admin/admin.component';
import { LoginComponent } from './home/account/login/login.component';
import { RegisterComponent } from './home/account/register/register.component';
import { MyFormComponent } from './jobs/my-form/my-form.component';
import { ApplicantsComponent ,CategoriesFilters} from './admin/admin/applicants/applicants.component';
import { JobsComponent } from './admin/admin/jobs/jobs.component';

import { MaterialModule} from"./material";
import { JobsListComponent } from './admin/admin/jobs/jobs-list/jobs-list.component';
import { NewJobComponent, EditJobComponent } from './admin/admin/jobs/new-job/new-job.component';
import { AvailableJobsComponent } from './jobs/available-jobs/available-jobs.component';
import { InstructionsConditionsComponent } from './jobs/instructions-conditions/instructions-conditions.component'

@NgModule({
  declarations: [
    AppComponent,
    TopheaderComponent,
    FooterComponent,
    HomeComponent,
    ApplicationformComponent,
    EditApplicationformComponent,
    AdminComponent,
    LoginComponent,
    RegisterComponent,
    MyFormComponent,
    ApplicantsComponent,
    JobsComponent,
    JobsListComponent,
    NewJobComponent,
    EditJobComponent,
    CategoriesFilters,
    AvailableJobsComponent,
    InstructionsConditionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    DataTablesModule,
    MaterialModule,
    NgbModule,
    ModalModule.forRoot(),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppInterceptorService,
      multi: true,
  },
    AuthenticationService,
    BsModalRef
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

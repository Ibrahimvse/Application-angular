import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { AuthenticationService } from "../../../services/authentication.service";
import { MustMatch } from "../../../Classes/must-match";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: "app-register",
    templateUrl: "./register.component.html",
    styleUrls: ["../login/login.component.scss"],
})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    submitted = false;
    public error: string;
    isLoading = false;
    success:string;
    constructor(
        public auth: AuthenticationService,
        public router: Router,
        public formBuilder: FormBuilder
    ) {}

    ngOnInit() {
        this.registerForm = this.formBuilder.group(
            {
                mobile: ["", [Validators.required,Validators.minLength(10),Validators.maxLength(11)]],
                email: ["", [Validators.required, Validators.email]],
                password: ["", [Validators.required, Validators.minLength(6)]],
                confirmPassword: ["", [Validators.required]],
            },
            {
                validator: MustMatch("password", "confirmPassword"),
            }
        );
    }
    get f() {
        return this.registerForm.controls;
    }
    register() {
        this.submitted = true;
        this.error=this.success=null;
        if (!this.registerForm.valid) {
            return;
        }
        this.isLoading = true;
        this.auth.register(this.registerForm.value).subscribe(
            (response) => {
                this.success=response.success;
                this.isLoading=false;
                this.router.navigate(["/login"]);
            },
            (error) => {
                  this.error = this.auth.handleError(error);
                this.isLoading=false;
            }
        );
    }
}


import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
    selector: 'app-login-page',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
  })
  export class LoginPageComponent implements OnInit {
    public loginForm!: FormGroup;
  
    //constructor(private authenticationService: AuthenticationService) {}
  
    ngOnInit() {
      this.loginForm = new FormGroup({
        username: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required),
      });
    }
  
    public onSubmit() {
      
    this.loginForm.get('username')!.value
    this.loginForm!.get('password')!.value
      
    }
  }
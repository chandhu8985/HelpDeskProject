import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginData!: any;
  email: any;
  password: any;
  user: any
  useremail:any

  constructor(private data: DataService, private router: Router,private ds: DataService) {


  }
  ngOnInit():void{
    this.data.getData().subscribe((res) => this.loginData = res)
  }
  login() {
  
    this.user = this.loginData.find((data: any) => data.email === this.email)
    console.log(this.email,this.password,this.user.email,this.user.password)
    if (this.email === this.user.email && this.password === this.user.password) {
     this.data.setRole(this.user.role)
     this.ds.setuseremail(this.user.email)
      this.router.navigate(['home',this.email])
    }
    else{
      alert('Invalid Credentials')
    }
  }


}

import { Component } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  userEmail: string = '';

  constructor(private router: Router,private  DS:DataService, private arouter: ActivatedRoute) { }
  ngOnInit():void{
    this.userEmail = this.arouter.snapshot.params['id'];
    this.DS.setuseremail(this.userEmail)
   
  }
  //logout event
  logout() {
    let logout = confirm(" Do you want log out your account?")
    if (logout === true) {
      this.router.navigate(['login'])
    }
  }
  home(){
    this.router.navigate([`home/${this.userEmail}`])
  }
  



}

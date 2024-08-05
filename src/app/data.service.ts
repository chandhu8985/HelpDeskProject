import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  clicktype!:string
  useremail!:string
  role!:string;
  constructor(private http: HttpClient) { }
getData(){
  return this.http.get('http://localhost:3000/users');
}
postData(data: any) {
  return this.http.post('http://localhost:3000/requests', data);
}
getuseremail(){
  return this.useremail

}
setuseremail(email:string){
  this.useremail=email
}
getrequests(){
  return this.http.get('http://localhost:3000/requests');
}

onEditRequest(request: any,id:number){
  return this.http.put(`http://localhost:3000/requests/${id}`,request);
}

setclicktype(type:string){
sessionStorage.setItem('type',JSON.stringify(type))
}
getrequestDetails(){
  return this.http.get('http://localhost:3000/requests');
}
setRole(role:string){
   sessionStorage.setItem('role',role)
  this.role=role
  }
}

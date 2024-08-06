import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export class DashboardComponent {

  constructor(private ds: DataService, private router: ActivatedRoute, private routers: Router) { }
  requests: any;
  useremail: any;
  request!: any;
  role!: string;
  filteredRequests: any;
  Requestdetails: any;
  updateRequest: any
  isVisible!: boolean;
  alluserDetails!: any
  allrequestDetails!: any
  singleuserDetails!: any
  

  ngOnInit(): void {
    this.useremail = this.router.snapshot.params['id']
    console.log(this.useremail)
    // this.ds.setuseremail(this.useremail)
    this.ds.getrequests().subscribe(data => {
      this.requests = data
      this.filteredRequests = this.requests.filter((request: any) => request.email === this.useremail);
      console.log(this.filteredRequests, 'requests')

      //loading user data

      this.ds.getData().subscribe(response => {
        this.alluserDetails = response
        console.log(this.alluserDetails, 'userdetails')
        this.singleuserDetails = this.alluserDetails.find((user: any) => user.email === this.useremail);
    
        console.log(this.singleuserDetails.role, 'res')


        //displaying data based on role
        if (this.singleuserDetails.role === 'user') {
          this.allrequestDetails = this.filteredRequests
        }
        else {
          this.allrequestDetails = this.requests
        }
      })
    }
    )

  }
   //When click the ticketid  it shows the request details 

  onRequestClick(requestId: number,type:string) {
    this.ds.getrequests().subscribe(res => {
      this.Requestdetails = res
      this.Requestdetails = this.Requestdetails.find((request: any) => request.id === requestId);
      
      console.log(this.Requestdetails)
    }
    )
    this.isVisible = true;
  }
  hide() {
    this.isVisible = false;
  }
  // when we click the edit button  shows the edit request details.
  onEditRequest(request: any, type: string) {
    this.ds.setclicktype(type)
    this.ds.onEditRequest(request, request.id).subscribe(
      (response: any) => {
        this.routers.navigate([`home/${this.useremail}/newrequest/${request.id}`])
        console.log('Request updated successfully', response);

      })
  }
  //  when click the Delete Request ticket status  must be cancelled.
  onDeleteRequest(id: number) {
    const response = confirm(`are you sure want to delete?`)
    if (response) {

      this.Requestdetails = this.requests.find((request: any) => request.id === id);
      let requestdata = {
        ...this.Requestdetails,

        status: 'cancelled'

      }
      this.ds.onEditRequest(requestdata, id).subscribe(
        (response: any) => {

          console.log('Request updated successfully', response);
          console.log(alert(`Your Request updated Successfully! \n Your Request Id is ${id}`))
        })

    }

  }

}

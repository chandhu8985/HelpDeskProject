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

  constructor(private ds: DataService, private router: ActivatedRoute, private routers: Router) { 
    
  }
  requests: any;
  useremail: any;
  request!: any;
  role!: string;
  filteredRequests: any;
  Requestdetails: any;
  updateRequest: any
  isVisible: boolean=false;
  alluserDetails!: any
  allrequestDetails!: any
  singleuserDetails!: any
  sortingCriteria:any
  statusOrder:any={
    Open: 1,
    InProgress: 2,
    Completed: 3,
    Cancelled: 4
  }
    priorityOrder:any= {
      high: 1,
      medium: 2,
      low: 3
    }
  

  ngOnInit(): void {
    this.useremail = this.router.snapshot.params['id']
    console.log(this.useremail)
    this.ds.getrequests().subscribe(data => {
      this.requests = data
      this.filteredRequests = this.requests.filter((request: any) => request.email === this.useremail)
      console.log(this.filteredRequests, 'requests')
    

      //loading user data
   
      this.ds.getData().subscribe(response => {
        this.alluserDetails = response
        console.log(this.alluserDetails, 'userdetails')
        this.singleuserDetails = this.alluserDetails.find((user: any) => user.email === this.useremail)
    
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
   //When click the Requestid  it shows the request details 

  onRequestClick(requests: any,type:string) {
    this.ds.setclicktype(type)
    this.ds.getrequests().subscribe(res => {
      this.Requestdetails = res
      this.Requestdetails = this.Requestdetails.find((request: any) => request.id === requests.id);
      console.log(this.Requestdetails)
      if(this.singleuserDetails.role==='user'){
        this.isVisible = true;
      }
      else{
        this.routers.navigate([`home/${this.useremail}/newrequest/${requests.id}`])
      }
     
    }
    )
  }
  hide() {
    this.isVisible = false;
  }
  // When we click the Edit Button  shows the edit request details.

  onEditRequest(request: any, type: string) {
    this.ds.setclicktype(type)
    this.ds.onEditRequest(request, request.id).subscribe(
      (response: any) => {
        this.routers.navigate([`home/${this.useremail}/newrequest/${request.id}`])
        console.log('Request updated successfully', response);

      })
  }
  //  When click the Delete Button Request  status  must be cancelled.

  onDeleteRequest(id: number) {
    const response = confirm(`Are you want to Sure Delete the Request?`)
    if (response) {

      this.Requestdetails = this.requests.find((request: any) => request.id === id);
      let requestdata = {
        ...this.Requestdetails,

        status: 'Cancelled'

      }
      this.ds.onEditRequest(requestdata, id).subscribe(
        (response: any) => {

          console.log(alert(`Your Request Deleted  Successfully! \n Your Request Id is ${id}`))
        })

    }

  }
  
  sortRequests() {
    this.sortRequests=this.allrequestDetails.sort((a:any, b:any) => {
      // Compare by status
      if (this.sortingCriteria.statusOrder[a.status] !== this.sortingCriteria.statusOrder[b.status]) {
        return this.sortingCriteria.statusOrder[a.status] - this.sortingCriteria.statusOrder[b.status];
      }
      // Compare by priority
      if (this.sortingCriteria.priorityOrder[a.priority] !== this.sortingCriteria.priorityOrder[b.priority]) {
        return this.sortingCriteria.priorityOrder[a.priority] - this.sortingCriteria.priorityOrder[b.priority];
      }
      // Compare by date and time
      return a.datetime.getTime() - b.datetime.getTime();
    });
  }

}

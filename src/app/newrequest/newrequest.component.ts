import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { Router ,ActivatedRoute} from '@angular/router';



@Component({
  selector: 'app-newrequest',
  templateUrl: './newrequest.component.html',
  styleUrl: './newrequest.component.css'
})
export class NewrequestComponent {
  constructor(private ds:DataService,private router:Router,private ac:ActivatedRoute) { }
  clicktype!:string
  ngForm!:any;
  title!:string;
  category!:string;
  description!:string;
  priority!:string;
  requestid!:number;
  email:string='';
  RequestDetails!:any;
  request!:any;
  fetchingRequests:any;
  status!:any;
  isEmailEnabled: boolean = true;
  updateRequest:any;
  CancelRequest:any;
  role!: string;
  resolvedby!:string;
  comment!:string;
  resolveddate!:Date;
  isEditing: boolean = false;
  isUpdateVisible: boolean = true; // Control visibility of update button
  isCancelVisible: boolean = true; // Control visibility of cancel button
 
  toggleEmailField(event: any) {
    this.isEmailEnabled = !event.target.checked
    // console.log(event.target.name,event.target.checked)
  }
  onCancelRequest(){
    this.router.navigate([`home/${this.ds.getuseremail()}`])
  }

  
  ngOnInit(): void {
    this.email=this.ds.getuseremail()
    this.requestid=this.ac.snapshot.params['id']
   const role=sessionStorage.getItem('role')
   if(role){
    this.role=role
   }
   console.log(this.role,'resss')
    if(this.requestid){
      let clicktype=sessionStorage.getItem('type')
      if(clicktype){
        this.clicktype=JSON.parse(clicktype)
      }
      this.ds.getrequests().subscribe((res)=>{
        this.fetchingRequests=res
       this.RequestDetails=this.fetchingRequests.find((res:any)=>res.id===this.requestid)
       this.email=this.RequestDetails.email
       this.title=this.RequestDetails.title
       this.category=this.RequestDetails.category
       this.description=this.RequestDetails.description
       this.priority=this.RequestDetails.priority

       
       this.comment=this.RequestDetails.comment
       this.status=this.RequestDetails.status
       this.resolvedby=this.RequestDetails.resolved_by
       this.resolveddate=this.RequestDetails.resolved_date
       
     })
    }
  }
  onupdateRequest(){

    let requestdata={
      ...this.RequestDetails,
      title:this.title,
      category:this.category,
      description:this.description,
      priority:this.priority,
      email:this.email,
      status:this.status,
      resolved_by:this.resolvedby,
      resolved_date:this.resolveddate,
      comment:this.comment

    }
    console.log(this.status,this.comment,this.resolvedby,this.resolveddate,'status','comment','resolvedby','resolveddate')
  this.ds.onEditRequest(requestdata,this.requestid).subscribe(
    (response:any )=> {
      console.log(requestdata,'updated')
    this.router.navigate([`home/${this.ds.getuseremail()}`])
    // console.log('Request updated successfully', response)
   console.log(alert(`Your Request updated Successfully! \n Your Request Id is ${this.RequestDetails.id}`))
  
}) 
  }
  
  onSubmit(form:any){
    const generateId = () => {
      return String(Math.floor(100000 + Math.random() * 900000)); // Generates a 6-digit number as a string
    }
  
  let data={
    id: generateId(),
      'title': this.title,
      'category': this.category,
      'description': this.description,
      'priority': this.priority,
      'email': this.email,
      'status':'Open',
      'comment': this.comment,
      'created_by': this.email,
      'created_date': new Date().toLocaleString(),
      'resolved_by': this.resolvedby,
      'resolved_date': this.resolveddate
  }
  console.log(data)
  if(form.valid)
  {
    this.ds.postData(data).subscribe((res)=> alert(`Your Request Added Successfully! \n Your Request Id is ${data.id}`))
    this.router.navigate([`home/${this.ds.getuseremail()}`])
  }
  else {
    alert('Fill the Required Fields')
  }

}
}


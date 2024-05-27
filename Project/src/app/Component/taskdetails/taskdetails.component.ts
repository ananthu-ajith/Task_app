import { Component } from '@angular/core';
import { DetailsService } from '../../Services/details.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { error } from 'console';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-taskdetails',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './taskdetails.component.html',
  styleUrl: './taskdetails.component.scss'
})
export class TaskdetailsComponent {
taskdetils:any = {
  "id": '',
  "name": '',
  "description": '',
  "due_date": '',
  "priority": '',
  "assignee":'',
  "status": ''
}
edit:boolean=true
userid:any=localStorage.getItem('userid')
taskid:any
userdet:any=[{Admin:false}]
users:any
constructor(private tasklist:DetailsService,private router:Router){}

  ngOnInit()
{
const usersJSON = localStorage.getItem('users');
    
    if (usersJSON !== null) {
        try {
            const parsedUsers = JSON.parse(usersJSON);
            if (Array.isArray(parsedUsers)) {
                this.users = parsedUsers;
            } else {
                console.error('Parsed data is not an array:', parsedUsers);
                this.users = []; 
            }
        } catch (error) {
            console.error('Failed to parse JSON:', error);
            this.users = [];
        }
    } else {
        this.users = [];
    }


this.tasklist.getsingleuser(this.userid).subscribe(
  {
    next:(data:any)=>
      this.userdet=data,
    error:error=>Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Not connected to the Server",
    })
    
  }
)

this.taskid=localStorage.getItem('taskid')
  this.rendertask()



}


rendertask(){
  this.tasklist.getsingledetails(this.taskid).subscribe(
    {
      next:(data:any)=>
        this.taskdetils=data,
      error:error=>Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Not connected to the Server",
      })
      
    }
  )
}

edittask()
{
  this.edit=!this.edit
}

savetask(a:any,b:any,c:any)
{

  
  if(a&&b&&c)
    
    {
      if(a.length>12)
        {
          alert('Task Name is too long')
        }
        else{this.tasklist.updatesingledetails(this.taskid,this.taskdetils).subscribe(
          {
            next:(data:any)=>
              this.taskdetils=data,
            error:error=>Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Not connected to the Server",
            })
            
          }
        
        )
        this.edit=!this.edit
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500
        });
      } 
    
    }
    else{
      alert('All fields are mandatory')
      this.rendertask()
    }
  
}
back()
{
  this.router.navigateByUrl('dashboard')
}

}

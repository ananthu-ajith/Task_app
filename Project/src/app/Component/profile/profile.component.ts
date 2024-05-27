import { Component } from '@angular/core';
import { DetailsService } from '../../Services/details.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { error } from 'console';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {

  userdet:any={
    Email:'',
    Username: '',
    Password: '',
    Image: ''
}
useremail:any
  isDisabled:boolean=true
  userid:any=localStorage.getItem('userid')
  deletedid:any
 

  constructor(private taskdetails:DetailsService,private router: Router){}

  ngOnInit()
  {
    this.taskdetails.getsingleuser(this.userid).subscribe(
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
    this.useremail=this.userdet.Email
  }

  modify()
  {
    alert('login again')
    const senddata:any={
      Email:this.userdet.Email,
      Username:this.userdet.Username,
      Password:this.userdet.Password,
      Image:this.userdet.Image
    }
    this.isDisabled=!this.isDisabled
    setTimeout(() => {
      this.taskdetails.patchuserdetails(this.userid,senddata).subscribe(
        {
          error:error=>Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Not connected to the Server",
          })
          
        }
        ) 
    }, 120);
    
    localStorage.setItem('curuser',this.userdet.Username)
    localStorage.setItem('curpass',this.userdet.Password)
    this.router.navigate(['']);
  }

  disable()
  {
    this.isDisabled=!this.isDisabled

  }

  // Convert photo to base64 format

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = () => {
            const base64Data = reader.result as string;
            
            this.userdet.Image = base64Data;
        };
        reader.readAsDataURL(file);
    }
}

deletaccnt(){

  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  }).then((result) => {
    if (result.isConfirmed) {
      this.taskdetails.deleteuser(this.userid).subscribe(
       {
        next: (data:any)=>
          this.deletedid=data,
        error:error=>Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Not connected to the Server",
        })
        
       }
      )
      Swal.fire({
        title: "Deleted!",
        text: "Your account has been deleted.",
        icon: "success"
      });
      this.router.navigateByUrl('')
    }
  });
}



back()
{
  this.router.navigateByUrl('dashboard')

}


}

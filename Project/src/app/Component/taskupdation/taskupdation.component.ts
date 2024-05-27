import { Component } from '@angular/core';
import { DetailsService } from '../../Services/details.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { error } from 'console';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-taskupdation',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './taskupdation.component.html',
  styleUrl: './taskupdation.component.scss'
})
export class TaskupdationComponent {


  form!: FormGroup
  sendform: any
  recievedform: any
  combined!: any[]
  cpmpletedform: any

  completedarr: any
  users: any
  curuser: any = localStorage.getItem('curuser')
  triggercal!: boolean

  patchbody: any = {
    status: 'Completed'
  }

  constructor(public taskdetails: DetailsService, private fb: FormBuilder, private router: Router) { }

  renderdetails() {
    this.taskdetails.getdetails().subscribe(
     {
      next: (data: any) => {
        this.recievedform = data.filter((task: any) => {
          return task.assignee == this.curuser || task.assignee == 'All'
        }
        )
        this.combined = this.recievedform
      },
      error:error=>Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Not connected to the Server",
      })
      
     }
  )
    this.taskdetails.getdetailscompleted().subscribe(
      
     {
      next: (data: any) => 
        this.completedarr = data,
      error:error=>Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Not connected to the Server",
        })
      
     }

    )
  }

  ngOnInit() {

    this.triggercal = false

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


    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(12)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      due_date: ['', [Validators.required]],
      priority: ['Medium'],
      assignee: ['All'],
      status: ['Pending']
    })
    this.renderdetails()


  }



  submit(a: string, b: string, c: string, d: string) {
    if (this.form.valid) {
      this.taskdetails.adddetails(this.form.value).subscribe(
      {
        next:  (data: any) => 
          this.sendform = data,
        error:error=>Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Not connected to the Server",
        })
        
      }


      )
      this.ngOnInit()

    }

    else {
      this.triggercal = true
    }
    this.renderdetails()
  }


  delete(id: number) {
    this.taskdetails.deletedetails(id).subscribe(
      {
        next:(data: any) => 
          this.recievedform = data,
        error:error=>Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Not connected to the Server",
        })
        
      }

    
    )
    this.renderdetails()
  }



  complete(id: any) {


    this.taskdetails.patchdetails(id, this.patchbody).subscribe(
      {
        next:(response: any) => 
          this.cpmpletedform = response,
        error:error=>Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Not connected to the Server",
        })
        
      }



    )


    setTimeout(() => {
      this.taskdetails.adddetailscomp(this.cpmpletedform).subscribe(
       {
        error:error=>Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Not connected to the Server",
        })
        
       }
    )
    }, 100)

    setTimeout(() => {
      this.delete(id)
    }, 200);

  }


  back() {
    this.router.navigateByUrl('dashboard')
  }

}

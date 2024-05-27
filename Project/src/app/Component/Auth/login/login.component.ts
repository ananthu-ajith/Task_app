import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { DetailsService } from '../../../Services/details.service';
import { error } from 'console';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, RouterOutlet],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  form!: FormGroup
  users!: any[]
  userExists!: boolean
  foundUser: any
  userId: any

  constructor(private fb: FormBuilder, private rout: Router, private taskdetails: DetailsService) { }

  ngOnInit() {
    this.form = this.fb.group({
      Username: [''],
      Password: ['']
    })


    // Store user data in localStorage

    this.taskdetails.getuserdetails().subscribe(

      {
        next:(data: any) => {
      
          localStorage.setItem('users', JSON.stringify(
            data.map((user: any) => {
              const { id, Username, Password } = user;
              return { id, Username, Password };
            })
          ))
        },
        error:error=>Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Not connected to the Server",
        })
        
      }
      

  );
  }

  listusers() {
    return new Promise((resolve, reject) => {
      resolve(
        this.users = JSON.parse(localStorage.getItem('users') || '[]')
      )
    })
  }

  // check if a user exists

  userexist() {
    return new Promise((resolve, reject) => {
      resolve(this.userExists = this.users.some((user) => user.Username === this.form.get('Username')?.value))
    })
  }

  founduser() {
    return new Promise((resolve, reject) => {
      resolve(this.foundUser = this.users.find((user) => user.Username === this.form.get('Username')?.value))
    })
  }

  setid() {
    return new Promise((resolve, reject) => {
      resolve(this.userId = this.foundUser ? this.foundUser.id : null)
    })
  }

      // Async function to handle the login process


  async login() {

    try{ const listusers = await this.listusers();
      const userexist = await this.userexist();
      const founduser = await this.founduser();
      const setid = await this.setid();}
      catch(error)
      {
        alert('Technical issue')
      }
   

    localStorage.setItem('userid', this.userId)


    localStorage.setItem('curuser', this.form.get('Username')?.value)
    localStorage.setItem('curpass', this.form.get('Password')?.value)

    if (this.userExists) {
      this.rout.navigateByUrl('dashboard')
    }
    else {
      alert('Incorrect Username')
    }

  }

}

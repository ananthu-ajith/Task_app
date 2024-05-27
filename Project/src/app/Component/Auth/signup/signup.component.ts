import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { DetailsService } from '../../../Services/details.service';
import { CommonModule } from '@angular/common';
import { error } from 'console';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, RouterOutlet, RouterLink, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {


  form!: FormGroup;
  users: any[] = [];
  userExists: boolean = false;
  emailExists: boolean = false;
  triggerval!: boolean
  imagevalidator: boolean = false


  constructor(private fb: FormBuilder, private taskdetails: DetailsService, private router: Router) {


  }

  ngOnInit() {
    this.form = this.fb.group({
      Email: ['', [Validators.required, Validators.email]],
      Username: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(12)]],
      Password: ['', [Validators.required, Validators.minLength(6)]],
      Admin: [],
      Image: ['', [Validators.required]]
    });
    this.loadUserDetails();
    this.triggerval = false
  }

    // Load user details

  loadUserDetails() {
    this.taskdetails.getuserdetails().subscribe(

      {
        next:(data:any)=>this.users=data,
        error:error=>Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Not connected to the Server",
        })
        
      }
      
  
  );
  }

  // Convert photo to base64 format

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64Data = reader.result as string;
        this.form.patchValue({ Image: base64Data });
      };
      reader.readAsDataURL(file);
      this.imagevalidator = false

    }
  }

  create() {

        // Values from the form

    const email = this.form.get('Email')?.value;
    const username = this.form.get('Username')?.value;
    const password = this.form.get('Password')?.value;
    const image = this.form.get('Image')?.value;


    if (this.form.invalid) {
      if (!image) {
        this.imagevalidator = true
      }
      this.triggerval = true
      return;
    }

    this.userExists = this.users.some((user) => user.Username === username);
    this.emailExists = this.users.some((user) => user.Email === email);

    if (this.emailExists) {
      alert('Email already exists')
    }
    else if (this.userExists) {
      alert('User already exists');
    }
    else {

      const newUser = {
        Email: email,
        Username: username,
        Password: password,
        Admin: this.form.get('Admin')?.value,
        Image: image

      };

      this.taskdetails.adduserdetails(newUser).subscribe(
        
        {
          next:(data:any)=>{alert('User created successfully')
            this.ngOnInit()},
          error:error=>Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Not connected to the Server",
          })
            
        }
      );
    }

  }
}

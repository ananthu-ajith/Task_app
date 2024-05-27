import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { SignupComponent } from './Component/Auth/signup/signup.component';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,SignupComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Project';

  constructor(private router:Router,private newtitle: Title){}

  ngOnInit()
  {
    this.newtitle.setTitle('Task Manager');
    // this.router.navigateByUrl('signup')
  }
}

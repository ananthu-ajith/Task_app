import { Routes } from '@angular/router';
import path from 'path';
import { LoginComponent } from './Component/Auth/login/login.component';
import { SignupComponent } from './Component/Auth/signup/signup.component';
import { DashboardComponent } from './Component/dashboard/dashboard.component';
import { logincheckGuard } from './Core/Guard/logincheck.guard';
import { TaskupdationComponent } from './Component/taskupdation/taskupdation.component';
import { ProfileComponent } from './Component/profile/profile.component';
import { TaskdetailsComponent } from './Component/taskdetails/taskdetails.component';
import { NotfoundComponent } from './Component/notfound/notfound.component';

export const routes: Routes = [

    // {
    //     path:'',
    //     redirectTo:'',
    //     pathMatch:'full'
    // },
    {
        
        path:'',
        component:SignupComponent
    },
    {
        
        path:'login',
        component:LoginComponent
    },
    {
        path:'dashboard',
        component:DashboardComponent,
        canActivate:[logincheckGuard],
        // children:[
        //     {
        //         path:'taskdetails',
        //         component:TaskdetailsComponent,
        //         // outlet:'taskOutlet'
        //     }
        // ]
    },
    {
        path:'profile',
        loadComponent:()=> import('./Component/profile/profile.component').then((c)=>c.ProfileComponent),
        canActivate:[logincheckGuard],
    },
    {
        path:'update',
        loadComponent:()=> import('./Component/taskupdation/taskupdation.component').then((c)=>c.TaskupdationComponent),
        canActivate:[logincheckGuard],
    },
    {
        path:'taskdetails',
        component:TaskdetailsComponent,
        canActivate:[logincheckGuard],

    },
    {
        path:'**',
        component:NotfoundComponent
    }
    

];

import { CanActivateFn } from '@angular/router';
import { DetailsService } from '../../Services/details.service';


export const logincheckGuard: CanActivateFn = (route, state) => {
 
  const users: any[] = JSON.parse(localStorage.getItem('users') || '[]');
const userinfo = localStorage.getItem('curuser');
const userpass = localStorage.getItem('curpass');

if (!userinfo || !userpass || !users.length) {
  alert('Incorrect username or password');
  return false;
}

for (const user of users) {
  if (user.Username === userinfo) {
    
    
      if (user.Password === userpass) {
         
          return true; // Allow navigation
      } else {
          alert('Incorrect password');
          return false; // Deny navigation
      }
  }
 
}



alert('Incorrect username');
return false; // Deny navigation

};

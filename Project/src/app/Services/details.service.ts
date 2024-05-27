import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DetailsService {

  constructor(private _http:HttpClient) { }


  getdetails()
  {
    return this._http.get('http://localhost:3000/tasks')
  }

  getdetailscompleted()
  {
    return this._http.get('http://localhost:3000/completed')
  }
  adddetails(abc:any)
  {
    return this._http.post('http://localhost:3000/tasks',abc)
  }

  deletedetails(id:any)
  {
    return this._http.delete(`http://localhost:3000/tasks/${id}`)
  }
  deletecompdetails(id:any)
  {
    return this._http.delete(`http://localhost:3000/completed/${id}`)
  }

  patchdetails(id:any, asd:any)
  {
    return this._http.patch(`http://localhost:3000/tasks/${id}`,asd)
  }

  adddetailscomp(abc:any){
    return this._http.post('http://localhost:3000/completed',abc)
  }

  getuserdetails()
  {
    return this._http.get('http://localhost:3000/users')
  }
  adduserdetails(abc:any)
  {return this._http.post('http://localhost:3000/users',abc)}


  patchuserdetails(id:any, asd:any)
  {
    return this._http.patch(`http://localhost:3000/users/${id}`,asd)
  }

  getsingleuser(id:any)
  {
    return this._http.get(`http://localhost:3000/users/${id}`)
  }

  getsingledetails(id:any)
  {
    return this._http.get(`http://localhost:3000/tasks/${id}`)
  }

  updatesingledetails(id:any, asd:any)
  {
    return this._http.patch(`http://localhost:3000/tasks/${id}`,asd)
  }

  deleteuser(id:any)
  {
    return this._http.delete(`http://localhost:3000/users/${id}`)
  }

}

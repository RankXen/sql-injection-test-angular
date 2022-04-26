import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const API_URL = environment.apiurl;

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient, ) { }  
  getPizza(token:string):Observable<any> {
    console.log('token: '+token);
    //token = 'c3FsLWluamVjdGlvbi10ZXN0OnZlcnktcGFzc3dvcmQtc3VjaC1zdHJvbmc=';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic ' + token
      })
    };
    console.log('httpOptions', httpOptions.headers)
    return this.http.get(API_URL + 'pizza', httpOptions)
  }
}
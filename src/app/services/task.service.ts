import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { loginTask, datos } from '../interface/task';
import { BehaviorSubject } from "rxjs";  

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  public usuario: datos;
  taskService: { rol: string; nombre: string; correologin: string; };

  constructor(private http: HttpClient) { 
  }

  url = 'https://tranquil-wildwood-15033.herokuapp.com/Backend.php';



  private dataSource = new BehaviorSubject("default message");
    serviceData = this.dataSource.asObservable();

    changeData(data: any) {
      this.dataSource.next(data);
    }

    private dataSource2 = new BehaviorSubject("default message");
    serviceDataTest = this.dataSource2.asObservable();

    changeDataTest(data: any) {
      this.dataSource2.next(data);
    }
    
  
  private data = new BehaviorSubject("default");
    serviceData2 = this.data.asObservable();

    confirmarTest(data: any) {
      this.data.next(data);
    }  


  

  Login(login: loginTask){
    return this.http.post(this.url,login);
  }


  
}

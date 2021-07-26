import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-show-recomendaciones',
  templateUrl: './show-recomendaciones.page.html',
  styleUrls: ['./show-recomendaciones.page.scss'],
})
export class ShowRecomendacionesPage implements OnInit {

  constructor(private http:HttpClient, private taskservice:TaskService) { }

  ngOnInit() {
    this.taskservice.serviceData.subscribe(data => (this.sentData=data));
    console.log('sent data from login page', this.sentData)
    this.http.get("https://tranquil-wildwood-15033.herokuapp.com/recomendaciones.php?correo="+this.sentData+"").subscribe((res:any)=>{
      console.log(res)
      this.nombre=res.nombre;
      if(res.imc >= 25){
        console.log('imc alto')
        this.peso=true; //le muestro recomendacion de peso
      }
      if(res.actividad=="No"){
        console.log('No realiza actividad fisica')
        this.hipertension="No"; 
        this.actividad=true; //le muestro recomendacion de actividad
        this.actividadd="No"
      }
      if(res.alimentacion=="No todos los dias"){
        console.log('no suele consumir frutas y verduras')
        this.alimentacion=true;
      }
    })
  }
  sentData:any;
  peso:boolean=false;
  nombre:string;
  hipertension="Si";
  actividad:boolean;
  actividadd:string;
  alimentacion:boolean;
}

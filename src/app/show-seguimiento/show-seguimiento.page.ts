import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-show-seguimiento',
  templateUrl: './show-seguimiento.page.html',
  styleUrls: ['./show-seguimiento.page.scss'],
})
export class ShowSeguimientoPage implements OnInit {

  constructor(private taskservice:TaskService, private http:HttpClient, private alert:AlertController) { }

  ngOnInit() {

    this.taskservice.serviceData.subscribe(data => (this.sentData=data));
    console.log('correo', this.sentData)
    this.taskservice.serviceDataTest.subscribe(data => (this.sentDataTest=data));
    console.log('id_test', this.sentDataTest)
    this.http.get("https://tranquil-wildwood-15033.herokuapp.com/seguimiento_test.php?correo="+this.sentData+"&test="+this.sentDataTest+"").subscribe((res:any)=>{
      console.log('desde seguimiento__________',res);

      if(res.edad=='Menos de 45 años'){
        this.edad = "success"
      }else if(res.edad=='Entre 45 y 54 años'){
        this.edad = "warning"
      }else if(res.edad=='Entre 55 y 64 años'){
        this.edad = "danger"
      }else if(res.edad=='Más de 64 años'){
        this.edad = "danger"
      }
      this.respuesta_edad = res.edad

      if(res.imc<25){
        this.imc = "success"
      }else if(res.imc>24 && res.imc<31){
        this.imc = "warning"
      }else if(res.imc>30){
        this.imc = "danger"
      }
      this.respuesta_imc = res.imc.substring(0, 2)

      if(res.cintura=='Menos de 80 cm'||res.cintura=='Menos de 94 cm'){
        this.cintura = "success"
      }else if(res.cintura=='Entre 80-88 cm'||res.cintura=='Entre 94-102 cm'){
        this.cintura = "danger"
      }else if(res.cintura=='Más 88 cm'||res.cintura=='Más 102 cm'){
        this.cintura = "danger"
      }
      this.respuesta_cintura = res.cintura

      if(res.actividad == "Si"){
        this.actividad = "success"
      }else{
        this.actividad = "danger"
      }
      this.respuesta_actividad = res.actividad

      if(res.alimentacion = "Todos los dias"){
        this.alimentacion = "success"
      }else{
        this.alimentacion = "warning"
      }
      this.respuesta_alimentacion = res.alimentacion

      if(res.hipertension=='Si'){
        this.hipertenso = "danger"
      }else if(res.hipertension=='No'){
        this.hipertenso = "success"
      }
      this.respuesta_hipertenso = res.hipertension

      if(res.glucosa=='Si'){
        this.glucosa = "danger"
      }else if(res.glucosa=='No'){
        this.glucosa = "success"
      }
      this.respuesta_glucosa = res.glucosa

      if(res.familiares_diabeticos=='No'){
        this.antecedentes = "success"
      }else if(res.familiares_diabeticos=='Si: abuelos, tios, primos'){
        this.antecedentes = "danger"
      }else if(res.familiares_diabeticos=='Si: padres, hermanos o hijos'){
        this.antecedentes = "danger"
      }
      this.respuesta_antecedentes = res.familiares_diabeticos

    })
  }



  edad:string;
  respuesta_edad:string;

  imc:string;
  respuesta_imc:string;

  cintura:string;
  respuesta_cintura:string;

  actividad:string;
  respuesta_actividad:string;

  alimentacion:string;
  respuesta_alimentacion:string;

  hipertenso:string;
  respuesta_hipertenso:string;

  glucosa:string;
  respuesta_glucosa:string;

  antecedentes:string;
  respuesta_antecedentes:string;

  sentData:any;

  sentDataTest:any;

}

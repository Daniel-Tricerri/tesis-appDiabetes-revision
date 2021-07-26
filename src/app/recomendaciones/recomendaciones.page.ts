import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TaskService } from '../services/task.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-recomendaciones',
  templateUrl: './recomendaciones.page.html',
  styleUrls: ['./recomendaciones.page.scss'],
})
export class RecomendacionesPage implements OnInit {
  
  test:boolean;
  sentData:any;
  primer_nombre:string;
  detalle:string;
  puntuacion:number;
  carita:boolean;
  carita_escala:string;

  constructor(private http:HttpClient, private taskservice:TaskService, private loadingController:LoadingController) { 
    
    this.taskservice.serviceData.subscribe(data => (this.sentData=data));
    console.log('correo de cual se consulta: ', this.sentData)

    this.consultarRecomendaciones();
  }
  
  ngOnInit() {
  }
  data:any;
  confirmacion:boolean;
  loading: HTMLIonLoadingElement;
  
  refrescar(){
    
    this.consultarRecomendaciones();
    console.log('actualizar recomendaciones')
  }

  doRefresh(event){
    
    setTimeout(()=>{
      this.consultarRecomendaciones();
      event.target.complete();
    },1500);
  }

  
  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Cargando...'
    });
    await this.loading.present();
  }

  consultarRecomendaciones(){
    this.presentLoading();
    this.http.get("https://tranquil-wildwood-15033.herokuapp.com/confirmar_test.php?correo="+this.sentData+"").subscribe((res:any)=>{
      
      console.log('responde ',res)

      this.loading.dismiss();

      if(res.status){
        this.test=true
        this.primer_nombre=res.primerNombre
        this.puntuacion=res.puntuacion
        this.detalle=res.detalle_resultado

        if(this.puntuacion>6){
          this.carita = false; // esta variable carita.. deberia llamarse ahora validarRecomendacion, solo sirve para mostrar o no el boton de recomendaciones.. antes tenia multiproposito por ello el nombre.
        }else{
          this.carita = true;
        }

        if(this.puntuacion<7){
          this.carita_escala="caritas_satisfaccion-1";
        }else if(this.puntuacion>6 && this.puntuacion<12){
          this.carita_escala="caritas_satisfaccion-2";
        }else if(this.puntuacion>11 && this.puntuacion<15){
          this.carita_escala="caritas_satisfaccion-3";
        }else if(this.puntuacion>14 && this.puntuacion<21){
          this.carita_escala="caritas_satisfaccion-4";
        }else if(this.puntuacion>20){
          this.carita_escala="caritas_satisfaccion-5";
        }

        console.log('carita:', this.carita)
        console.log('primer nombre',this.primer_nombre)
        console.log('detalle: ',res.detalle_resultado)
        console.log('se asigno un true')
      }else{
        this.test=false
        console.log('se asigno un false')
      }
    })
    
  }

}

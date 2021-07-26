import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { TaskService } from '../services/task.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-test-findrisk',
  templateUrl: './test-findrisk.page.html',
  styleUrls: ['./test-findrisk.page.scss'],
})
export class TestFindriskPage implements OnInit {

  constructor(private task:TaskService, private alert:AlertController, private http:HttpClient) { }
 sentData:any;
 confirmacion:boolean;
 nombre:string;
  ngOnInit() {

    this.task.serviceData.subscribe(data => (this.sentData=data));
    this.http.get("https://tranquil-wildwood-15033.herokuapp.com/recomendaciones.php?correo="+this.sentData+"").subscribe((res:any)=>{
      this.nombre=res.nombre;
    })
    this.http.get("https://tranquil-wildwood-15033.herokuapp.com/confirmar_test.php?correo="+this.sentData+"").subscribe((res:any)=>{
      this.confirmacion=res.status
      console.log('estado de variable confirmacion', this.confirmacion)
      if(this.confirmacion){
        console.log('ya registra un test en la base de datos!!!!')
      }else{
        console.log('no registra un test')
        this.presentAlert();
      }
    })
    
  }

  async presentAlert() {
    const alert = await this.alert.create({
      cssClass: 'alert-wrapper',
      mode: "ios",
      backdropDismiss:false,
      header: 'BIENVENIDO',
      subHeader: 'Para llevar una gestión integral de su perfil como las recomendaciones y el seguimiento, primero debe realizar el test de Findrisc para conocer su estado actual de salud',
      
      
      buttons: ['ENTENDIDO']
    });

    await alert.present();
  }

}